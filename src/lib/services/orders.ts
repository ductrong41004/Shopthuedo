import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  runTransaction,
  writeBatch,
  orderBy,
  addDoc,
  updateDoc
} from "firebase/firestore";

export interface ReturnDetails {
  condition: "good" | "damaged" | "lost_accessories" | "late";
  extraFee: number;
  compensation: number;
  notes: string;
  returnedAt: string;
}

export interface OrderData {
  id?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productCode: string;
  productName: string;
  productImage?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  rentalFee: number;
  depositFee: number;
  totalPrice: number;
  status: "RESERVED" | "RENTING" | "RETURNED" | "OVERDUE";
  notes?: string;
  createdAt?: any;
  returnDetails?: ReturnDetails;
}

/**
 * Kiểm tra xem sản phẩm có bị trùng lịch thuê với đơn hàng nào khác không
 */
export async function checkProductAvailability(
  productId: string,
  startDate: string,
  endDate: string,
  ignoreOrderId?: string
): Promise<{ available: boolean; conflictingOrder?: any }> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("productId", "==", productId),
      where("status", "in", ["RESERVED", "RENTING", "OVERDUE"])
    );
    const snapshot = await getDocs(q);

    for (const docSnapshot of snapshot.docs) {
      const order = docSnapshot.data() as OrderData;
      order.id = docSnapshot.id;

      if (ignoreOrderId && order.id === ignoreOrderId) {
        continue;
      }

      // Điều kiện trùng lịch: start <= newEnd && end >= newStart
      const isOverlapping = order.startDate <= endDate && order.endDate >= startDate;
      if (isOverlapping) {
        return { available: false, conflictingOrder: order };
      }
    }

    return { available: true };
  } catch (error) {
    console.error("Lỗi khi kiểm tra lịch thuê:", error);
    throw error;
  }
}

/**
 * Tạo đơn thuê mới bằng Firestore Transaction để đảm bảo không bị trùng lịch (concurrency safe)
 */
export async function createOrder(orderData: Omit<OrderData, "id" | "createdAt">): Promise<string> {
  try {
    const ordersRef = collection(db, "orders");
    const productRef = doc(db, "products", orderData.productId);

    const result = await runTransaction(db, async (transaction) => {
      // READ 1: Kiểm tra trùng lịch
      const activeOrdersQuery = query(
        ordersRef,
        where("productId", "==", orderData.productId),
        where("status", "in", ["RESERVED", "RENTING", "OVERDUE"])
      );
      const querySnapshot = await getDocs(activeOrdersQuery);
      const isOverlapping = querySnapshot.docs.some(docSnapshot => {
        const order = docSnapshot.data() as OrderData;
        return order.startDate <= orderData.endDate && order.endDate >= orderData.startDate;
      });
      if (isOverlapping) {
        throw new Error("Sản phẩm đã có lịch thuê trùng lặp trong khoảng thời gian này!");
      }

      // READ 2: Thông tin khách hàng
      const customerRef = doc(db, "customers", orderData.customerId);
      let customerSnap = null;
      if (orderData.customerId && orderData.customerId !== "public_customer") {
        customerSnap = await transaction.get(customerRef);
      }

      // --- WRITE ---
      const newOrderDocRef = doc(collection(db, "orders"));
      const today = new Date().toISOString().split("T")[0];

      transaction.set(newOrderDocRef, {
        ...orderData,
        createdAt: new Date().toISOString(),
      });

      // Cập nhật trạng thái sản phẩm
      let newProductStatus: "AVAILABLE" | "RESERVED" | "RENTING" = "AVAILABLE";
      if (orderData.status === "RENTING") {
        newProductStatus = "RENTING";
      } else if (today < orderData.startDate) {
        newProductStatus = "RESERVED";
      }
      transaction.update(productRef, { status: newProductStatus });

      // Chỉ ghi tài chính và cập nhật khách khi đơn thực sự ĐANG THUÊ (RENTING)
      // Đơn ĐẶT TRƯỚC (RESERVED) chưa thu tiền, nên chưa ghi vào doanh thu
      if (orderData.status === "RENTING") {
        // Cập nhật số lần thuê + tổng chi tiêu của khách
        if (customerSnap && customerSnap.exists()) {
          const customerData = customerSnap.data();
          transaction.update(customerRef, {
            totalOrders: (customerData.totalOrders || 0) + 1,
            totalSpent: (customerData.totalSpent || 0) + orderData.rentalFee
          });
        }

        // Ghi khoản thu "Tiền thuê" vào Sổ quỹ kèm orderId để dễ xóa sau này
        const financeRef = doc(collection(db, "financial_records"));
        transaction.set(financeRef, {
          type: "INFLOW",
          category: "Tiền thuê",
          amount: orderData.rentalFee,
          date: today,
          orderId: newOrderDocRef.id,
          notes: `Thu tiền thuê đơn hàng ${newOrderDocRef.id} - KH: ${orderData.customerName}`
        });

        // Ghi tiền cọc (lưu để theo dõi, không tính vào doanh thu)
        if (orderData.depositFee > 0) {
          const depositFinanceRef = doc(collection(db, "financial_records"));
          transaction.set(depositFinanceRef, {
            type: "INFLOW",
            category: "Tiền cọc",
            amount: orderData.depositFee,
            date: today,
            orderId: newOrderDocRef.id,
            notes: `Thu tiền cọc đơn hàng ${newOrderDocRef.id} - KH: ${orderData.customerName}`
          });
        }
      }

      return newOrderDocRef.id;
    });

    return result;
  } catch (error) {
    console.error("Lỗi khi tạo đơn thuê:", error);
    throw error;
  }
}

/**
 * Lấy tất cả đơn thuê
 */
export async function getOrders(): Promise<OrderData[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    })) as OrderData[];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn thuê:", error);
    return [];
  }
}

/**
 * Lấy chi tiết một đơn thuê
 */
export async function getOrderById(orderId: string): Promise<OrderData | null> {
  try {
    const docRef = doc(db, "orders", orderId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as OrderData;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn thuê:", error);
    return null;
  }
}

/**
 * Trả đồ và tất toán đơn thuê
 */
export async function returnOrder(
  orderId: string,
  productId: string,
  returnDetails: ReturnDetails
): Promise<void> {
  try {
    const batch = writeBatch(db);
    const orderRef = doc(db, "orders", orderId);
    const productRef = doc(db, "products", productId);
    const today = new Date().toISOString().split("T")[0];

    // 1. Cập nhật đơn hàng: Đã trả và kèm chi tiết trả đồ
    batch.update(orderRef, {
      status: "RETURNED",
      returnDetails
    });

    // 2. Cập nhật trạng thái sản phẩm về AVAILABLE
    batch.update(productRef, {
      status: "AVAILABLE"
    });

    // 3. Ghi chép tài chính các khoản phát sinh nếu có
    // a. Phụ thu (nếu có)
    if (returnDetails.extraFee > 0) {
      const extraFeeRef = doc(collection(db, "financial_records"));
      batch.set(extraFeeRef, {
        type: "INFLOW",
        category: "Tiền thuê",
        amount: returnDetails.extraFee,
        date: today,
        notes: `Phụ thu đơn hàng ${orderId} - Lý do: ${returnDetails.notes || "Trả trễ hạn"}`
      });
    }

    // b. Bồi thường (nếu có)
    if (returnDetails.compensation > 0) {
      const compRef = doc(collection(db, "financial_records"));
      batch.set(compRef, {
        type: "INFLOW",
        category: "Bồi thường",
        amount: returnDetails.compensation,
        date: today,
        notes: `Tiền bồi thường đơn hàng ${orderId} - Lý do: ${returnDetails.notes || "Hỏng/mất phụ kiện"}`
      });
    }

    // c. Hoàn trả tiền cọc (Chi ra)
    // Để ghi nhận tất toán, ta xem như hoàn tiền cọc lại cho khách nếu có tiền cọc
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      const orderData = orderSnap.data() as OrderData;
      if (orderData.depositFee > 0) {
        const refundRef = doc(collection(db, "financial_records"));
        batch.set(refundRef, {
          type: "OUTFLOW",
          category: "Tiền cọc",
          amount: orderData.depositFee,
          date: today,
          notes: `Hoàn tiền cọc đơn hàng ${orderId} - KH: ${orderData.customerName}`
        });
      }
    }

    await batch.commit();
  } catch (error) {
    console.error("Lỗi khi xử lý trả đồ:", error);
    throw error;
  }
}

/**
 * Xóa đơn thuê — xóa luôn bản ghi tài chính liên quan và rollback số liệu khách hàng
 */
export async function deleteOrder(orderId: string): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (!orderSnap.exists()) return;

    const orderData = orderSnap.data() as OrderData;
    const batch = writeBatch(db);

    // 1. Xóa document đơn hàng
    batch.delete(orderRef);

    // 2. Khôi phục trạng thái sản phẩm về AVAILABLE
    const productRef = doc(db, "products", orderData.productId);
    batch.update(productRef, { status: "AVAILABLE" });

    // 3. Xóa tất cả bản ghi tài chính liên kết với đơn này (nếu đơn đang RENTING)
    if (orderData.status === "RENTING" || orderData.status === "OVERDUE") {
      const financeQuery = query(
        collection(db, "financial_records"),
        where("orderId", "==", orderId)
      );
      const financeSnap = await getDocs(financeQuery);
      financeSnap.docs.forEach(d => batch.delete(d.ref));

      // 4. Rollback số lần thuê và tổng chi tiêu của khách hàng
      if (orderData.customerId && orderData.customerId !== "public_customer") {
        const customerRef = doc(db, "customers", orderData.customerId);
        const customerSnap = await getDoc(customerRef);
        if (customerSnap.exists()) {
          const customerData = customerSnap.data();
          batch.update(customerRef, {
            totalOrders: Math.max(0, (customerData.totalOrders || 0) - 1),
            totalSpent: Math.max(0, (customerData.totalSpent || 0) - orderData.rentalFee)
          });
        }
      }
    }

    await batch.commit();
  } catch (error) {
    console.error("Lỗi khi xóa đơn thuê:", error);
    throw error;
  }
}

/**
 * Tự động quét và cập nhật trạng thái đơn thuê quá hạn (OVERDUE) và trạng thái sản phẩm (RENTING)
 * Khi RESERVED → RENTING: tự động ghi tài chính + cập nhật số liệu khách hàng
 */
export async function autoUpdateOrderStatus(): Promise<void> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("status", "in", ["RESERVED", "RENTING"]));
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);
    let count = 0;

    for (const docSnapshot of snapshot.docs) {
      const order = docSnapshot.data() as OrderData;
      const orderId = docSnapshot.id;
      const productRef = doc(db, "products", order.productId);
      let updatedStatus: string | null = null;
      let productStatus: string | null = null;

      if (order.status === "RESERVED" && today >= order.startDate && today <= order.endDate) {
        // RESERVED → RENTING: ghi tài chính + cập nhật khách hàng tại đây
        updatedStatus = "RENTING";
        productStatus = "RENTING";

        // Ghi khoản thu tiền thuê vào Sổ quỹ (kèm orderId để dễ xóa)
        const financeRef = doc(collection(db, "financial_records"));
        batch.set(financeRef, {
          type: "INFLOW",
          category: "Tiền thuê",
          amount: order.rentalFee,
          date: today,
          orderId,
          notes: `Thu tiền thuê đơn hàng ${orderId} - KH: ${order.customerName}`
        });

        // Ghi tiền cọc
        if (order.depositFee > 0) {
          const depositRef = doc(collection(db, "financial_records"));
          batch.set(depositRef, {
            type: "INFLOW",
            category: "Tiền cọc",
            amount: order.depositFee,
            date: today,
            orderId,
            notes: `Thu tiền cọc đơn hàng ${orderId} - KH: ${order.customerName}`
          });
        }

        // Cập nhật số liệu khách hàng
        if (order.customerId && order.customerId !== "public_customer") {
          const customerRef = doc(db, "customers", order.customerId);
          const customerSnap = await getDoc(customerRef);
          if (customerSnap.exists()) {
            const cData = customerSnap.data();
            batch.update(customerRef, {
              totalOrders: (cData.totalOrders || 0) + 1,
              totalSpent: (cData.totalSpent || 0) + order.rentalFee
            });
          }
        }

      } else if (order.status === "RENTING" && today > order.endDate) {
        updatedStatus = "OVERDUE";
        productStatus = "RENTING"; // Vẫn đang cầm đồ trễ hạn chưa trả
      } else if (order.status === "RESERVED" && today > order.endDate) {
        // Đặt trước nhưng quá hạn không đến lấy
        updatedStatus = "OVERDUE";
        productStatus = "AVAILABLE";
      }

      if (updatedStatus) {
        batch.update(doc(db, "orders", orderId), { status: updatedStatus });
        if (productStatus) {
          batch.update(productRef, { status: productStatus });
        }
        count++;
      }
    }

    if (count > 0) {
      await batch.commit();
      console.log(`Đã tự động cập nhật ${count} đơn hàng.`);
    }
  } catch (error) {
    console.error("Lỗi tự động cập nhật trạng thái đơn hàng:", error);
  }
}

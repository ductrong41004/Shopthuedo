import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { ProductData } from "./products";
import { OrderData } from "./orders";

export interface FinancialRecord {
  id?: string;
  type: "INFLOW" | "OUTFLOW"; // INFLOW: Thu, OUTFLOW: Chi
  category: 
    | "Tiền thuê" 
    | "Tiền cọc" 
    | "Bán sản phẩm" 
    | "Bồi thường" // Thu nhập bồi thường hỏng hóc
    | "Nhập hàng" 
    | "Giặt ủi" 
    | "Sửa chữa" 
    | "Marketing" 
    | "Chi phí khác";
  amount: number;
  date: string; // YYYY-MM-DD
  notes?: string;
  createdAt?: string;
}

/**
 * Lấy tất cả ghi chép thu chi
 */
export async function getFinancialRecords(): Promise<FinancialRecord[]> {
  try {
    const ref = collection(db, "financial_records");
    const q = query(ref, orderBy("date", "desc"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    })) as FinancialRecord[];
  } catch (error) {
    console.error("Lỗi khi lấy sổ quỹ thu chi:", error);
    return [];
  }
}

/**
 * Thêm ghi chép thu chi
 */
export async function createFinancialRecord(record: Omit<FinancialRecord, "id" | "createdAt">): Promise<string> {
  try {
    const ref = collection(db, "financial_records");
    const docRef = await addDoc(ref, {
      ...record,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi thêm ghi chép thu chi:", error);
    throw error;
  }
}

/**
 * Xóa ghi chép thu chi
 */
export async function deleteFinancialRecord(id: string): Promise<void> {
  try {
    const docRef = doc(db, "financial_records", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Lỗi khi xóa ghi chép thu chi:", error);
    throw error;
  }
}

/**
 * Lấy thông tin thống kê trang Tổng quan (Dashboard)
 */
export async function getDashboardStats(): Promise<{
  totalProducts: number;
  rentingCount: number;
  availableCount: number;
  upcomingReturnCount: number;
  todayRevenue: number;
  monthRevenue: number;
  upcomingDueOrders: OrderData[];
  overdueOrders: OrderData[];
  recentRents: OrderData[];
}> {
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const thisMonthStr = todayStr.substring(0, 7); // YYYY-MM

    // 1. Đọc tất cả sản phẩm
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const products = productsSnapshot.docs.map(d => ({ id: d.id, ...d.data() }) as ProductData);
    const totalProducts = products.length;

    // 2. Đọc tất cả đơn thuê
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    const allOrders = ordersSnapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as OrderData[];

    // Tập hợp ID sản phẩm đang có đơn thuê active (RENTING hoặc OVERDUE)
    const rentedProductIds = new Set(
      allOrders
        .filter(o => o.status === "RENTING" || o.status === "OVERDUE")
        .map(o => o.productId)
    );

    const rentingCount = rentedProductIds.size;
    const availableCount = Math.max(0, totalProducts - rentingCount);

    // 3. Tính doanh thu thực tế từ sổ quỹ thu chi (loại bỏ hoàn toàn Tiền cọc)
    const financeRef = collection(db, "financial_records");
    const financeSnapshot = await getDocs(financeRef);
    const financeRecords = financeSnapshot.docs.map(d => d.data() as FinancialRecord);

    let todayRevenue = 0;
    let monthRevenue = 0;

    financeRecords.forEach(record => {
      // Chỉ tính các khoản thu thực tế (Tiền thuê, Bán sản phẩm, Bồi thường...) và BỎ QUA tiền cọc
      if (record.type === "INFLOW" && record.category !== "Tiền cọc") {
        if (record.date === todayStr) {
          todayRevenue += record.amount;
        }
        if (record.date.startsWith(thisMonthStr)) {
          monthRevenue += record.amount;
        }
      }
    });

    // Đơn quá hạn (OVERDUE) hoặc (RENTING nhưng đã qua ngày trả)
    const overdueOrders = allOrders.filter(
      o => o.status === "OVERDUE" || (o.status === "RENTING" && o.endDate < todayStr)
    );

    // Đơn sắp đến hạn trả (RENTING và ngày trả là hôm nay hoặc trong vòng 2 ngày tới)
    const upcomingReturnCount = allOrders.filter(o => {
      if (o.status !== "RENTING") return false;
      const diffTime = new Date(o.endDate).getTime() - new Date(todayStr).getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3; // Trong vòng 3 ngày tới
    }).length;

    // Danh sách widget đơn sắp đến hạn
    const upcomingDueOrders = allOrders
      .filter(o => o.status === "RENTING" || o.status === "RESERVED")
      .sort((a, b) => a.endDate.localeCompare(b.endDate))
      .slice(0, 5);

    // Danh sách widget đơn thuê gần đây nhất
    const recentRents = allOrders
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);

    return {
      totalProducts,
      rentingCount,
      availableCount,
      upcomingReturnCount,
      todayRevenue: Math.max(0, todayRevenue),
      monthRevenue: Math.max(0, monthRevenue),
      upcomingDueOrders,
      overdueOrders,
      recentRents
    };
  } catch (error) {
    console.error("Lỗi khi tính toán thống kê dashboard:", error);
    return {
      totalProducts: 0,
      rentingCount: 0,
      availableCount: 0,
      upcomingReturnCount: 0,
      todayRevenue: 0,
      monthRevenue: 0,
      upcomingDueOrders: [],
      overdueOrders: [],
      recentRents: []
    };
  }
}

/**
 * Lấy dữ liệu báo cáo chi tiết theo năm
 */
export async function getReportStats(year: number = new Date().getFullYear()): Promise<{
  revenueChartData: { month: string; revenue: number; expense: number }[];
  rentalChartData: { month: string; count: number }[];
  topProducts: { code: string; name: string; count: number; revenue: number }[];
  vipCustomers: { name: string; phone: string; count: number; spent: number }[];
}> {
  try {
    // 1. Thống kê Thu Chi theo từng tháng trong năm
    const financeRef = collection(db, "financial_records");
    const financeSnapshot = await getDocs(financeRef);
    const financeRecords = financeSnapshot.docs.map(d => d.data() as FinancialRecord);

    const monthlyDataMap: { [key: string]: { revenue: number; expense: number } } = {};
    for (let i = 1; i <= 12; i++) {
      const monthStr = `${year}-${String(i).padStart(2, "0")}`;
      monthlyDataMap[monthStr] = { revenue: 0, expense: 0 };
    }

    financeRecords.forEach(record => {
      const month = record.date.substring(0, 7); // YYYY-MM
      if (month.startsWith(String(year)) && monthlyDataMap[month]) {
        if (record.type === "INFLOW") {
          // Bỏ qua cọc tạm giữ, chỉ tính doanh thu thực tế
          if (record.category !== "Tiền cọc") {
            monthlyDataMap[month].revenue += record.amount;
          }
        } else if (record.type === "OUTFLOW") {
          // Bỏ qua hoàn cọc (vì là tạm giữ trả lại), tính các chi phí khác
          if (record.category !== "Tiền cọc") {
            monthlyDataMap[month].expense += record.amount;
          }
        }
      }
    });

    const revenueChartData = Object.keys(monthlyDataMap)
      .sort()
      .map(month => {
        const m = parseInt(month.split("-")[1]);
        return {
          month: `Tháng ${m}`,
          revenue: monthlyDataMap[month].revenue,
          expense: monthlyDataMap[month].expense
        };
      });

    // 2. Thống kê Lượt thuê theo từng tháng trong năm
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    const orders = ordersSnapshot.docs.map(d => d.data() as OrderData);

    const monthlyRentalMap: { [key: string]: number } = {};
    for (let i = 1; i <= 12; i++) {
      const monthStr = `${year}-${String(i).padStart(2, "0")}`;
      monthlyRentalMap[monthStr] = 0;
    }

    orders.forEach(order => {
      const month = order.startDate.substring(0, 7);
      if (month.startsWith(String(year)) && monthlyRentalMap[month] !== undefined) {
        monthlyRentalMap[month]++;
      }
    });

    const rentalChartData = Object.keys(monthlyRentalMap)
      .sort()
      .map(month => {
        const m = parseInt(month.split("-")[1]);
        return {
          month: `T${m}`,
          count: monthlyRentalMap[month]
        };
      });

    // 3. Top sản phẩm thuê nhiều nhất
    const productStats: { [productId: string]: { code: string; name: string; count: number; revenue: number } } = {};
    orders.forEach(order => {
      if (!productStats[order.productId]) {
        productStats[order.productId] = {
          code: order.productCode,
          name: order.productName,
          count: 0,
          revenue: 0
        };
      }
      productStats[order.productId].count++;
      productStats[order.productId].revenue += order.rentalFee;
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 4. Khách hàng VIP
    const customersRef = collection(db, "customers");
    const customersSnapshot = await getDocs(customersRef);
    const customers = customersSnapshot.docs.map(d => d.data() as any);

    const vipCustomers = customers
      .map(c => ({
        name: c.name,
        phone: c.phone,
        count: c.totalOrders || 0,
        spent: c.totalSpent || 0
      }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);

    return {
      revenueChartData,
      rentalChartData,
      topProducts,
      vipCustomers
    };
  } catch (error) {
    console.error("Lỗi khi thống kê báo cáo:", error);
    return {
      revenueChartData: [],
      rentalChartData: [],
      topProducts: [],
      vipCustomers: []
    };
  }
}

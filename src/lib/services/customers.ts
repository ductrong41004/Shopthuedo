import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { OrderData } from "./orders";

export interface CustomerData {
  id?: string;
  name: string;
  phone: string;
  facebook: string;
  zalo: string;
  address: string;
  notes?: string;
  totalOrders: number; // Tổng số lần thuê
  totalSpent: number; // Tổng chi tiêu
  createdAt?: string;
}

/**
 * Lấy tất cả khách hàng
 */
export async function getCustomers(): Promise<CustomerData[]> {
  try {
    const customersRef = collection(db, "customers");
    const q = query(customersRef, orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    })) as CustomerData[];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    return [];
  }
}

/**
 * Lấy chi tiết khách hàng theo ID
 */
export async function getCustomerById(customerId: string): Promise<CustomerData | null> {
  try {
    const docRef = doc(db, "customers", customerId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as CustomerData;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết khách hàng:", error);
    return null;
  }
}

/**
 * Thêm khách hàng mới
 */
export async function createCustomer(customerData: Omit<CustomerData, "id" | "totalOrders" | "totalSpent">): Promise<string> {
  try {
    const customersRef = collection(db, "customers");
    const docRef = await addDoc(customersRef, {
      ...customerData,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
    throw error;
  }
}

/**
 * Cập nhật thông tin khách hàng
 */
export async function updateCustomer(customerId: string, customerData: Partial<CustomerData>): Promise<void> {
  try {
    const docRef = doc(db, "customers", customerId);
    await updateDoc(docRef, customerData);
  } catch (error) {
    console.error("Lỗi khi cập nhật khách hàng:", error);
    throw error;
  }
}

/**
 * Xóa khách hàng
 */
export async function deleteCustomer(customerId: string): Promise<void> {
  try {
    const docRef = doc(db, "customers", customerId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    throw error;
  }
}

/**
 * Lấy lịch sử đơn thuê của một khách hàng
 */
export async function getCustomerOrders(customerId: string): Promise<OrderData[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("customerId", "==", customerId),
      orderBy("startDate", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    })) as OrderData[];
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử thuê của khách hàng:", error);
    return [];
  }
}

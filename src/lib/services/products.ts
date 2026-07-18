import { db, storage } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface ProductData {
  id?: string;
  code: string; // Mã SP (ví dụ: D001)
  name: string;
  category: string; // Đầm cưới, Váy dạ hội, Áo dài, Phụ kiện...
  size: string; // S, M, L, XL, Free size...
  color: string;
  rentalPrice: number;
  deposit: number;
  description: string;
  images: string[]; // Danh sách link ảnh
  videoUrl?: string; // Link video review ngắn
  status: "AVAILABLE" | "RESERVED" | "RENTING" | "MAINTENANCE";
  createdAt?: string;
}

/**
 * Lấy tất cả sản phẩm
 */
export async function getProducts(): Promise<ProductData[]> {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("code", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      ...docSnapshot.data()
    })) as ProductData[];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return [];
  }
}

/**
 * Lấy chi tiết sản phẩm theo ID
 */
export async function getProductById(productId: string): Promise<ProductData | null> {
  try {
    const docRef = doc(db, "products", productId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ProductData;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return null;
  }
}

/**
 * Thêm sản phẩm mới
 */
export async function createProduct(productData: Omit<ProductData, "id">): Promise<string> {
  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    throw error;
  }
}

/**
 * Cập nhật thông tin sản phẩm
 */
export async function updateProduct(productId: string, productData: Partial<ProductData>): Promise<void> {
  try {
    const docRef = doc(db, "products", productId);
    await updateDoc(docRef, productData);
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    throw error;
  }
}

/**
 * Xóa sản phẩm
 */
export async function deleteProduct(productId: string): Promise<void> {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
}

/**
 * Tải ảnh lên Firebase Storage và trả về URL
 */
export async function uploadProductImage(file: File): Promise<string> {
  try {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
    const storageRef = ref(storage, `products/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên Storage:", error);
    throw error;
  }
}

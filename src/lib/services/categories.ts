import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Category {
  id?: string;
  name: string;
  createdAt?: string;
}

const COLLECTION = "categories";

// Lấy toàn bộ danh mục
export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Category));
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    return [];
  }
}

// Tạo danh mục mới
export async function createCategory(name: string): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    name: name.trim(),
    createdAt: new Date().toISOString()
  });
}

// Xóa danh mục
export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// Seed danh mục mặc định nếu chưa có
export async function seedDefaultCategories(): Promise<void> {
  const existing = await getCategories();
  if (existing.length > 0) return; // Đã có rồi, không seed lại

  const defaults = [
    "Đầm dạ hội",
    "Váy cưới",
    "Áo dài",
    "Váy Boho/Dạo phố",
    "Phụ kiện",
    "Khác"
  ];

  for (const name of defaults) {
    await addDoc(collection(db, COLLECTION), {
      name,
      createdAt: new Date().toISOString()
    });
  }
}

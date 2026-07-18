"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  writeBatch, 
  doc, 
  addDoc
} from "firebase/firestore";
import { 
  Settings as SettingsIcon, 
  Database, 
  Download, 
  Trash2, 
  Sparkles, 
  X,
  Plus,
  Tag,
  FileText,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { 
  getCategories, 
  createCategory, 
  deleteCategory,
  seedDefaultCategories,
  Category 
} from "@/lib/services/categories";
import { auth } from "@/lib/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";

type Tab = "categories" | "database" | "account";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  // Danh mục
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [catLoading, setCatLoading] = useState(false);

  // Đổi mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const fetchCategories = async () => {
    setCatLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } finally {
      setCatLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (categories.some(c => c.name.toLowerCase() === newCatName.trim().toLowerCase())) {
      toast.error("Danh mục này đã tồn tại!");
      return;
    }
    setCatLoading(true);
    try {
      await createCategory(newCatName);
      toast.success(`Đã thêm danh mục "${newCatName.trim()}"`);
      setNewCatName("");
      fetchCategories();
    } catch {
      toast.error("Không thể thêm danh mục.");
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (cat: Category) => {
    if (!confirm(`Xóa danh mục "${cat.name}"? Sản phẩm đang dùng danh mục này sẽ không bị ảnh hưởng.`)) return;
    setCatLoading(true);
    try {
      await deleteCategory(cat.id!);
      toast.success(`Đã xóa danh mục "${cat.name}"`);
      fetchCategories();
    } catch {
      toast.error("Không thể xóa danh mục.");
    } finally {
      setCatLoading(false);
    }
  };

  const handleSeedCategories = async () => {
    setCatLoading(true);
    try {
      await seedDefaultCategories();
      toast.success("Đã nạp danh mục mặc định!");
      fetchCategories();
    } catch {
      toast.error("Lỗi khi nạp danh mục.");
    } finally {
      setCatLoading(false);
    }
  };

  // Đổi mật khẩu admin
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ tất cả các ô.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (newPassword === currentPassword) {
      toast.error("Mật khẩu mới phải khác mật khẩu hiện tại.");
      return;
    }

    setPwLoading(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("Chưa đăng nhập.");

      // Xác thực lại bằng mật khẩu hiện tại trước khi đổi
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Đổi mật khẩu mới
      await updatePassword(user, newPassword);

      toast.success("✅ Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        toast.error("Mật khẩu hiện tại không đúng!");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Quá nhiều lần thử. Vui lòng thử lại sau.");
      } else {
        toast.error("Lỗi: " + err.message);
      }
    } finally {
      setPwLoading(false);
    }
  };

  // Nạp dữ liệu chạy thử (Mock Data Seeder)
  const handleSeedData = async () => {
    if (!confirm("Bạn có muốn nạp dữ liệu mẫu chạy thử không? Thao tác này sẽ thêm các sản phẩm, khách hàng, đơn thuê và giao dịch mẫu vào Firebase.")) return;
    
    setLoading(true);
    try {
      const batch = writeBatch(db);
      const today = new Date().toISOString().split("T")[0];

      const mockProducts = [
        { code: "D001", name: "Váy Boho Họa Tiết Đi Biển", category: "Váy Boho/Dạo phố", size: "Free size", color: "Be họa tiết", rentalPrice: 200000, deposit: 300000, description: "Đầm dáng dài bay bổng thích hợp chụp ảnh hoàng hôn.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop"], videoUrl: "", status: "RENTING" },
        { code: "D002", name: "Váy Cưới Lụa Satin Trễ Vai", category: "Váy cưới", size: "M", color: "Trắng tinh khôi", rentalPrice: 800000, deposit: 1500000, description: "Váy cưới satin lụa thiết kế cao cấp.", images: ["https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=500&auto=format&fit=crop"], videoUrl: "", status: "AVAILABLE" },
        { code: "D003", name: "Đầm Dạ Hội Kim Sa Ngọc Trai", category: "Đầm dạ hội", size: "S", color: "Hồng pastel lấp lánh", rentalPrice: 450000, deposit: 800000, description: "Đầm đính đá ngọc trai sang trọng.", images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop"], videoUrl: "", status: "RESERVED" },
        { code: "D004", name: "Áo Dài Gấm Hoa Mai Đỏ", category: "Áo dài", size: "L", color: "Đỏ hồng", rentalPrice: 250000, deposit: 400000, description: "Áo dài gấm thêu mai vàng.", images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop"], videoUrl: "", status: "AVAILABLE" },
        { code: "D005", name: "Mũ Rộng Vành Đi Biển Cao Cấp", category: "Phụ kiện", size: "Free size", color: "Be sữa", rentalPrice: 50000, deposit: 100000, description: "Mũ cói đi biển thời trang.", images: ["https://images.unsplash.com/photo-1572426473040-7e486447e3ee?w=500&auto=format&fit=crop"], videoUrl: "", status: "AVAILABLE" }
      ];

      const productIds: string[] = [];
      const productsRef = collection(db, "products");
      for (const p of mockProducts) {
        const docRef = doc(productsRef);
        batch.set(docRef, { ...p, createdAt: new Date().toISOString() });
        productIds.push(docRef.id);
      }

      const mockCustomers = [
        { name: "Nguyễn Thị Phương Vy", phone: "0912445678", facebook: "", zalo: "0912445678", address: "Resort Pullman Phú Quốc", notes: "Khách du lịch Hà Nội", totalOrders: 2, totalSpent: 400000 },
        { name: "Trần Mai Chi", phone: "0987654321", facebook: "", zalo: "0987654321", address: "Khách sạn Novotel Phú Quốc", notes: "Khách VIP, chụp pre-wedding", totalOrders: 1, totalSpent: 800000 },
        { name: "Lê Minh Thư", phone: "0934112233", facebook: "", zalo: "", address: "Homestay Dương Đông", notes: "Thường thuê áo dài", totalOrders: 1, totalSpent: 250000 }
      ];

      const customerIds: string[] = [];
      const customersRef = collection(db, "customers");
      for (const c of mockCustomers) {
        const docRef = doc(customersRef);
        batch.set(docRef, { ...c, createdAt: new Date().toISOString() });
        customerIds.push(docRef.id);
      }

      const ordersRef = collection(db, "orders");
      const order1Ref = doc(ordersRef);
      batch.set(order1Ref, { customerId: customerIds[0], customerName: mockCustomers[0].name, customerPhone: mockCustomers[0].phone, productId: productIds[0], productCode: mockProducts[0].code, productName: mockProducts[0].name, productImage: mockProducts[0].images[0], startDate: today, endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], rentalFee: 400000, depositFee: 300000, totalPrice: 400000, status: "RENTING", notes: "Giao đồ tại quầy lễ tân.", createdAt: new Date().toISOString() });

      const financeRef = collection(db, "financial_records");
      const mockFinance = [
        { type: "INFLOW", category: "Tiền thuê", amount: 400000, date: today, notes: "Thu tiền thuê váy D001 - KH Vy" },
        { type: "INFLOW", category: "Tiền cọc", amount: 300000, date: today, notes: "Thu cọc đơn Vy" },
        { type: "OUTFLOW", category: "Giặt ủi", amount: 150000, date: today, notes: "Chi tiền giặt khô đầm tiệc cưới" },
        { type: "OUTFLOW", category: "Marketing", amount: 500000, date: today, notes: "Chi quảng cáo Facebook tháng này" },
        { type: "OUTFLOW", category: "Nhập hàng", amount: 2000000, date: today, notes: "Chi phí nhập thêm váy mới" }
      ];
      for (const f of mockFinance) {
        const docRef = doc(financeRef);
        batch.set(docRef, { ...f, createdAt: new Date().toISOString() });
      }

      await batch.commit();
      toast.success("Nạp dữ liệu demo thành công! Vui lòng tải lại trang.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      toast.error("Lỗi nạp dữ liệu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sao lưu dữ liệu
  const handleBackupData = async () => {
    setLoading(true);
    try {
      const cols = ["products", "customers", "orders", "financial_records", "categories"];
      const backupData: { [key: string]: any[] } = {};
      for (const colName of cols) {
        const snapshot = await getDocs(collection(db, colName));
        backupData[colName] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
      const a = document.createElement("a");
      a.setAttribute("href", jsonString);
      a.setAttribute("download", `thueodoquytnho_backup_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Tải xuống bản sao lưu thành công!");
    } catch (error: any) {
      toast.error("Lỗi xuất sao lưu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa toàn bộ dữ liệu
  const handleClearDatabase = async () => {
    if (!confirm("CẢNH BÁO: Thao tác này sẽ XÓA TOÀN BỘ dữ liệu. Không thể khôi phục. Tiếp tục?")) return;
    setLoading(true);
    try {
      const cols = ["products", "customers", "orders", "financial_records", "categories"];
      let count = 0;
      for (const colName of cols) {
        const snapshot = await getDocs(collection(db, colName));
        const batch = writeBatch(db);
        snapshot.docs.forEach(d => { batch.delete(d.ref); count++; });
        if (snapshot.docs.length > 0) await batch.commit();
      }
      toast.success(`Đã xóa ${count} tài liệu!`);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      toast.error("Lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Tab switcher */}
      <div className="flex gap-2 bg-brand-pink/30 p-1 rounded-2xl border border-brand-pink-pastel w-fit flex-wrap">
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === "categories" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-dark"}`}
        >
          <Tag className="w-3.5 h-3.5" /> Danh mục sản phẩm
        </button>
        <button
          onClick={() => setActiveTab("database")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === "database" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-dark"}`}
        >
          <Database className="w-3.5 h-3.5" /> Quản lý dữ liệu
        </button>
        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTab === "account" ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-dark"}`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Tài khoản
        </button>
      </div>

      {/* ===== TAB: DANH MỤC ===== */}
      {activeTab === "categories" && (
        <div className="glass-card p-6 border space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-pink-pastel/60">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-primary" />
              <div>
                <h3 className="heading-serif font-bold text-lg text-text-dark">Danh mục sản phẩm</h3>
                <p className="text-[10px] text-text-muted">Quản lý các danh mục hiển thị khi thêm sản phẩm</p>
              </div>
            </div>
            <button
              onClick={handleSeedCategories}
              disabled={catLoading}
              className="btn-secondary text-xs py-2 px-4 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Nạp mặc định
            </button>
          </div>

          {/* Form thêm danh mục */}
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Tên danh mục mới... (VD: Vest & Blazer)"
              className="flex-1 px-4 py-2.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
            />
            <button
              type="submit"
              disabled={catLoading || !newCatName.trim()}
              className="btn-primary text-xs py-2 px-5 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Thêm
            </button>
          </form>

          {/* Danh sách danh mục */}
          {catLoading ? (
            <div className="h-32 flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-10 text-xs text-text-muted space-y-3">
              <Tag className="w-10 h-10 text-brand-pink-pastel mx-auto" />
              <p>Chưa có danh mục nào. Nhấn <strong>"Nạp mặc định"</strong> để thêm nhanh!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between px-4 py-3 bg-brand-pink/10 border border-brand-pink-pastel/50 rounded-xl group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    <span className="text-sm font-semibold text-text-dark">{cat.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Xóa danh mục"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-[10px] text-text-muted pt-2 border-t border-brand-pink-pastel/40">
            💡 Danh mục này sẽ hiển thị trong form thêm/sửa sản phẩm và bộ lọc trang Sản phẩm, Lịch thuê và Website khách hàng.
          </p>
        </div>
      )}

      {/* ===== TAB: QUẢN LÝ DỮ LIỆU ===== */}
      {activeTab === "database" && (
        <div className="space-y-6">
          <div className="glass-card p-6 border space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="heading-serif font-bold text-lg text-text-dark">Quản lý cơ sở dữ liệu</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seeder */}
              <div className="border border-brand-pink-pastel rounded-xl p-5 bg-brand-pink/5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-text-dark text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Nạp dữ liệu chạy thử
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Tự động thêm sản phẩm, khách hàng, đơn thuê và giao dịch mẫu để xem thử giao diện.
                  </p>
                </div>
                <button onClick={handleSeedData} disabled={loading} className="btn-primary w-full justify-center mt-6 cursor-pointer text-xs">
                  Khởi tạo dữ liệu mẫu
                </button>
              </div>

              {/* Backup */}
              <div className="border border-brand-pink-pastel rounded-xl p-5 bg-brand-beige/25 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-text-dark text-sm flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-accent-gold" /> Sao lưu dữ liệu về máy
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Xuất toàn bộ dữ liệu dưới dạng file JSON về máy tính để sao lưu dự phòng.
                  </p>
                </div>
                <button onClick={handleBackupData} disabled={loading} className="btn-secondary w-full justify-center mt-6 cursor-pointer text-xs">
                  Tải bản sao lưu (.json)
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="pt-4 border-t border-brand-pink-pastel">
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-red-700 text-sm flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4" /> Vùng nguy hiểm: Xóa sạch dữ liệu
                  </h4>
                  <p className="text-xs text-red-600 leading-relaxed max-w-lg">
                    Xóa tất cả dữ liệu trong Firebase. Hãy sao lưu trước khi thực hiện.
                  </p>
                </div>
                <button onClick={handleClearDatabase} disabled={loading} className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full cursor-pointer shrink-0 transition-colors">
                  Xóa sạch database
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin hệ thống */}
          <div className="glass-card p-6 border space-y-3">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60">
              <SettingsIcon className="w-5 h-5 text-primary" />
              <h3 className="heading-serif font-bold text-lg text-text-dark">Thông tin hệ thống</h3>
            </div>
            <div className="text-xs space-y-2 text-text-muted leading-relaxed">
              <p>• <strong>Ứng dụng:</strong> Website Quản Lý Thuê Đồ Quýt Nhỏ — v1.0.0</p>
              <p>• <strong>Kiến trúc:</strong> Next.js App Router + Firebase (Auth, Firestore, Storage, Hosting)</p>
              <p>• <strong>Sao lưu:</strong> Firebase tự động đa khu vực + xuất JSON thủ công</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB: TÀI KHOẢN ===== */}
      {activeTab === "account" && (
        <div className="glass-card p-6 border space-y-6 max-w-lg">
          <div className="flex items-center gap-3 pb-4 border-b border-brand-pink-pastel/60">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <div>
              <h3 className="heading-serif font-bold text-lg text-text-dark">Bảo mật tài khoản</h3>
              <p className="text-[10px] text-text-muted">Đổi mật khẩu đăng nhập admin</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Mật khẩu hiện tại */}
            <div>
              <label className="block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider">
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Nhập mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all"
                />
                <button type="button" onClick={() => setShowCurrent(v => !v)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label className="block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider">
                Mật khẩu mới
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Ít nhất 6 ký tự"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all"
                />
                <button type="button" onClick={() => setShowNew(v => !v)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword.length > 0 && newPassword.length < 6 && (
                <p className="text-[10px] text-red-500 mt-1 pl-3">Mật khẩu phải có ít nhất 6 ký tự</p>
              )}
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div>
              <label className="block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-brand-white border rounded-full text-sm focus:outline-none focus:ring-2 transition-all ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : confirmPassword && confirmPassword === newPassword
                      ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100"
                      : "border-brand-pink-pastel focus:border-primary focus:ring-brand-pink-pastel"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary cursor-pointer transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[10px] text-red-500 mt-1 pl-3">Mật khẩu không khớp</p>
              )}
              {confirmPassword && confirmPassword === newPassword && newPassword.length >= 6 && (
                <p className="text-[10px] text-emerald-600 mt-1 pl-3">✓ Mật khẩu khớp</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pwLoading || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-semibold transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {pwLoading ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang xử lý...</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Đổi mật khẩu</>
              )}
            </button>
          </form>

          <p className="text-[10px] text-text-muted border-t border-brand-pink-pastel/40 pt-3">
            💡 Sau khi đổi mật khẩu, lần đăng nhập tiếp theo dùng mật khẩu mới. Tên đăng nhập vẫn là <strong>admin</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

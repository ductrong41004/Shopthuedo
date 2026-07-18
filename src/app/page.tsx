"use client";

import React, { useState, useEffect } from "react";
import { getProducts, ProductData } from "@/lib/services/products";
import { checkProductAvailability, createOrder } from "@/lib/services/orders";
import { getCategories } from "@/lib/services/categories";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Info,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Shirt,
  Search,
  MessageCircle,
  Tag,
  User,
  Heart,
  X
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

// Danh mục load động từ Firestore

export default function CustomerHomepage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);

  // Booking Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custZalo, setCustZalo] = useState("");
  const [custNotes, setCustNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Checking state
  const [checking, setChecking] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<{ available: boolean; message?: string } | null>(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      // Chỉ hiện các sản phẩm không ở trạng thái bảo trì
      setProducts(data.filter(p => p.status !== "MAINTENANCE"));
      setFilteredProducts(data.filter(p => p.status !== "MAINTENANCE"));
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(["Tất cả", ...cats.map(c => c.name)]);
    } catch {
      setCategories(["Tất cả", "Đầm dạ hội", "Váy cưới", "Áo dài", "Váy Boho/Dạo phố", "Phụ kiện"]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Lọc sản phẩm theo danh mục
  useEffect(() => {
    if (activeCategory === "Tất cả") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  // Kiểm tra lịch trống tức thời khi đổi ngày
  useEffect(() => {
    if (selectedProduct && startDate && endDate) {
      const checkDate = async () => {
        setChecking(true);
        setAvailabilityResult(null);
        try {
          const res = await checkProductAvailability(selectedProduct.id!, startDate, endDate);
          if (res.available) {
            setAvailabilityResult({ available: true, message: "Trống lịch! Bạn có thể gửi yêu cầu đặt váy." });
          } else {
            setAvailabilityResult({ available: false, message: "Sản phẩm này đã có lịch thuê trong thời gian bạn chọn. Vui lòng chọn ngày khác." });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setChecking(false);
        }
      };
      checkDate();
    } else {
      setAvailabilityResult(null);
    }
  }, [startDate, endDate, selectedProduct]);

  const openBookingModal = (p: ProductData) => {
    setSelectedProduct(p);
    setCustName("");
    setCustPhone("");
    setCustZalo("");
    setCustNotes("");
    setStartDate("");
    setEndDate("");
    setAvailabilityResult(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !custName || !custPhone || !startDate || !endDate) {
      toast.error("Vui lòng điền đầy đủ thông tin đặt thuê.");
      return;
    }

    if (availabilityResult && !availabilityResult.available) {
      toast.error("Sản phẩm không trống lịch trong ngày đã chọn!");
      return;
    }

    setSubmittingOrder(true);
    try {
      // 1. Tạo nhanh tài khoản khách hàng nếu chưa có hoặc cập nhật
      // Trong phiên bản Firestore Client, chúng ta tạo bản ghi đơn thuê trước
      // và gắn cờ `isPending: true` để Admin nhận duyệt thủ công ở Dashboard
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      const calculatedRentalFee = selectedProduct.rentalPrice * days;

      const payload = {
        customerId: "public_customer", // Cờ đánh dấu khách đặt từ web
        customerName: custName.trim(),
        customerPhone: custPhone.trim(),
        productId: selectedProduct.id!,
        productCode: selectedProduct.code,
        productName: selectedProduct.name,
        productImage: selectedProduct.images?.[0] || "",
        startDate,
        endDate,
        rentalFee: calculatedRentalFee,
        depositFee: selectedProduct.deposit,
        totalPrice: calculatedRentalFee,
        status: "RESERVED" as const, // Trạng thái đặt trước
        notes: `YÊU CẦU ĐẶT ONLINE từ Website - Zalo: ${custZalo} | Ghi chú: ${custNotes.trim()}`
      };

      await createOrder(payload);
      toast.success("Gửi yêu cầu đặt thuê thành công! Admin sẽ liên hệ lại với bạn sớm nhất.");
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error("Lỗi khi gửi yêu cầu đặt thuê: " + error.message);
    } finally {
      setSubmittingOrder(false);
    }
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-brand-white text-text-dark font-sans">
      <Toaster position="top-right" />

      {/* Nav bar */}
      <header className="sticky top-0 bg-brand-white/80 backdrop-filter backdrop-blur-md border-b border-brand-pink-pastel/60 px-4 md:px-12 py-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-primary">
            <Heart className="w-4 h-4 fill-primary" />
          </div>
          <span className="heading-serif font-bold text-lg text-text-dark">Thuê Đồ Quýt Nhỏ</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://maps.app.goo.gl/B1T46EdsSvGE7VZ48?g_st=ic" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-semibold text-primary hover:bg-brand-pink px-4 py-2 border border-brand-pink-pastel rounded-full transition-colors flex items-center gap-1.5"
          >
            Vị trí tiệm
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink/30 via-brand-beige/50 to-brand-white py-16 md:py-24 text-center px-4">
        <div className="absolute top-10 left-10 w-44 h-44 bg-brand-pink-pastel/40 rounded-full blur-2xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-brand-pink/30 rounded-full blur-2xl -z-10"></div>

        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink-pastel text-primary border border-brand-pink-pastel">
            <Sparkles className="w-3.5 h-3.5" />
            Lưu giữ khoảnh khắc thơ mộng tại đảo Ngọc
          </span>
          
          <h1 className="heading-serif text-4xl md:text-5xl font-bold text-text-dark leading-snug">
            Thuê Váy Xinh Chụp Ảnh <br />
            <span className="text-primary block mt-2">Đẹp Trọn Vẹn Phú Quốc</span>
          </h1>
          
          <p className="text-text-muted text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Shop chuyên cho thuê đầm Boho đi biển, váy cưới satin chụp pre-wedding, áo dài và phụ kiện sang trọng tại Phú Quốc. Vải cao cấp, hỗ trợ check lịch trống và đặt trước online tiện lợi.
          </p>

          <div className="pt-4">
            <a href="#catalog" className="btn-primary py-3 px-8 text-sm">
              Xem bộ sưu tập váy đầm
            </a>
          </div>
        </div>
      </section>

      {/* Catalog Showroom */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 py-16 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="heading-serif text-3xl font-bold text-text-dark">Bộ Sưu Tập Trang Phục</h2>
          <p className="text-xs text-text-muted">Chọn bộ trang phục yêu thích và kiểm tra lịch trống đi biển của bạn</p>
        </div>

        {/* Categories Tabs - Load động từ Firestore */}
        <div className="flex flex-wrap justify-center gap-2 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-brand-white text-text-muted hover:bg-brand-pink hover:text-primary border border-brand-pink-pastel"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="glass-card flex flex-col overflow-hidden text-left border">
                <div className="relative h-72 w-full bg-brand-beige overflow-hidden border-b border-brand-pink-pastel">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-pink-pastel"><Shirt className="w-12 h-12" /></div>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                    Size: {product.size}
                  </span>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-bold text-text-dark text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-text-gray">Mã sản phẩm: <span className="font-semibold text-text-dark">{product.code}</span> | Màu: {product.color}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-pink-pastel/50 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] text-text-gray font-bold uppercase">Giá thuê/ngày</p>
                      <p className="text-sm font-bold text-primary heading-serif">{formatVND(product.rentalPrice)}</p>
                    </div>

                    <button
                      onClick={() => openBookingModal(product)}
                      className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full shadow-sm cursor-pointer"
                    >
                      Đặt lịch thuê
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux max-w-lg mx-auto">
            <Shirt className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
            <p className="text-sm text-text-muted font-medium">Hiện tại shop chưa đăng tải trang phục nào trong danh mục này.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-brand-beige/40 border-t border-brand-pink-pastel/60 py-8 px-4 text-center text-xs text-text-gray space-y-2">
        <p className="font-bold text-text-dark">Shop Thuê Đồ Quýt Nhỏ © 2026</p>
        <p className="max-w-md mx-auto">Địa chỉ: Ngã 3 Loan Sang, Suối Đá, Dương Tơ, Phú Quốc | SĐT hỗ trợ: 0706-804-997</p>
        <p className="text-[10px] text-text-muted pt-2">Hệ thống quản lý dịch vụ cho thuê chuyên nghiệp</p>
      </footer>

      {/* Booking Request Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-brand-white w-full max-w-md overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <h3 className="heading-serif text-lg font-bold text-text-dark">Yêu cầu đặt thuê online</h3>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Product Info Summary */}
              <div className="bg-brand-pink/15 border border-brand-pink-pastel rounded-xl p-3 flex gap-3 items-center">
                <div className="w-10 h-14 bg-brand-beige border border-brand-pink-pastel rounded overflow-hidden shrink-0">
                  {selectedProduct.images?.[0] ? (
                    <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  ) : <Shirt className="w-5 h-5 text-brand-pink-pastel" />}
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-text-dark">{selectedProduct.name} ({selectedProduct.code})</h4>
                  <p className="text-text-gray mt-0.5">Giá thuê: <span className="font-bold text-primary">{formatVND(selectedProduct.rentalPrice)}/ngày</span> | Cọc: {formatVND(selectedProduct.deposit)}</p>
                </div>
              </div>

              {/* Lịch đặt */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Ngày nhận váy *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Ngày trả váy *</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
              </div>

              {/* Kết quả kiểm tra lịch */}
              {checking && (
                <div className="text-xs text-text-gray flex items-center gap-1.5 italic">
                  <div className="w-3.5 h-3.5 border-2 border-brand-pink border-t-primary rounded-full animate-spin"></div>
                  <span>Đang kiểm tra lịch trống của váy...</span>
                </div>
              )}

              {availabilityResult && (
                <div className={`p-2.5 rounded-xl border text-[11px] flex items-start gap-2 ${
                  availabilityResult.available 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                    : "bg-red-50 border-red-200 text-red-800"
                }`}>
                  {availabilityResult.available ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{availabilityResult.message}</span>
                </div>
              )}

              {/* Form Khách hàng */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Họ và tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="Nguyễn Thị Kim Anh"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="0912345678"
                      className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Zalo liên hệ (Nếu có)</label>
                    <input
                      type="text"
                      value={custZalo}
                      onChange={(e) => setCustZalo(e.target.value)}
                      placeholder="0912345678"
                      className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-text-dark mb-1 uppercase">Ghi chú (Ví dụ: Khách sạn lưu trú)</label>
                  <textarea
                    rows={2}
                    value={custNotes}
                    onChange={(e) => setCustNotes(e.target.value)}
                    placeholder="Khách ở Resort Novotel Phú Quốc, giao đồ buổi chiều..."
                    className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary bg-brand-white resize-none text-text-dark"
                  />
                </div>
              </div>

              {/* Info banner */}
              <div className="bg-brand-beige border border-brand-pink-pastel rounded-xl p-3 text-[10px] text-text-muted flex items-start gap-1.5">
                <Info className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                <span>Yêu cầu đặt thuê của bạn sẽ được gửi tới bộ phận quản lý. Shop sẽ chủ động liên hệ lại qua SĐT/Zalo để xác nhận và giữ váy.</span>
              </div>

              <div className="pt-2 border-t border-brand-pink-pastel flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="btn-secondary py-2 px-4 text-xs font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submittingOrder || (availabilityResult !== null && !availabilityResult.available)}
                  className="btn-primary py-2 px-5 text-xs font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingOrder ? "Đang gửi..." : "Gửi yêu cầu đặt thuê"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

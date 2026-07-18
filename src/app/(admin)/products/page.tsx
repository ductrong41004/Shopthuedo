"use client";

import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  ProductData
} from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";
import { Plus, Search, Filter, Edit, Trash2, X, Upload, ImageIcon, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { compressImage } from "@/lib/utils/compress";

// Danh mục được load động từ Firestore (xem state categories bên dưới)
const SIZES = ["S", "M", "L", "XL", "Free size"];
const STATUSES = [
  { value: "AVAILABLE", label: "Có sẵn", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "RESERVED", label: "Đã đặt trước", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "RENTING", label: "Đang thuê", color: "bg-pink-50 text-primary border-brand-pink-pastel" },
  { value: "MAINTENANCE", label: "Bảo trì", color: "bg-zinc-100 text-zinc-600 border-zinc-200" }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Bộ lọc
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  
  // State Form
  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formSize, setFormSize] = useState(SIZES[0]);
  const [formColor, setFormColor] = useState("");
  const [formRentalPrice, setFormRentalPrice] = useState(0);
  const [formDeposit, setFormDeposit] = useState(0);
  const [formDescription, setFormDescription] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formStatus, setFormStatus] = useState<ProductData["status"]>("AVAILABLE");

  // Uploading state
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      toast.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      const names = cats.map(c => c.name);
      setCategories(names);
      if (names.length > 0) setFormCategory(names[0]);
    } catch {
      // fallback nếu chưa có danh mục
      const defaults = ["Đầm dạ hội", "Váy cưới", "Áo dài", "Váy Boho/Dạo phố", "Phụ kiện", "Khác"];
      setCategories(defaults);
      setFormCategory(defaults[0]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Xử lý bộ lọc sản phẩm
  useEffect(() => {
    let result = products;

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s)
      );
    }

    if (selectedCategory !== "ALL") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== "ALL") {
      result = result.filter(p => p.status === selectedStatus);
    }

    setFilteredProducts(result);
  }, [search, selectedCategory, selectedStatus, products]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormCode("");
    setFormName("");
    setFormCategory(categories[0] || "");
    setFormSize(SIZES[0]);
    setFormColor("");
    setFormRentalPrice(0);
    setFormDeposit(0);
    setFormDescription("");
    setFormImages([]);
    setFormVideoUrl("");
    setFormStatus("AVAILABLE");
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductData) => {
    setEditingProduct(product);
    setFormCode(product.code);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormSize(product.size);
    setFormColor(product.color);
    setFormRentalPrice(product.rentalPrice);
    setFormDeposit(product.deposit);
    setFormDescription(product.description || "");
    setFormImages(product.images || []);
    setFormVideoUrl(product.videoUrl || "");
    setFormStatus(product.status);
    setIsModalOpen(true);
  };

  // Upload ảnh
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const originalFile = e.target.files[0];
    
    try {
      toast.loading("Đang tối ưu dung lượng ảnh...", { id: "upload-status" });
      // Nén ảnh về tối đa 1200px chất lượng 75% trước khi đưa lên đám mây
      const compressedFile = await compressImage(originalFile, 1200, 0.75);
      
      toast.loading("Đang tải ảnh lên hệ thống...", { id: "upload-status" });
      const url = await uploadProductImage(compressedFile);
      
      setFormImages(prev => [...prev, url]);
      toast.success("Tải ảnh lên thành công!", { id: "upload-status" });
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên.", { id: "upload-status" });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode || !formName || !formColor || formRentalPrice <= 0) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    const payload: Omit<ProductData, "id"> = {
      code: formCode.trim().toUpperCase(),
      name: formName.trim(),
      category: formCategory,
      size: formSize,
      color: formColor.trim(),
      rentalPrice: Number(formRentalPrice),
      deposit: Number(formDeposit),
      description: formDescription.trim(),
      images: formImages,
      videoUrl: formVideoUrl.trim(),
      status: formStatus
    };

    setLoading(true);
    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, payload);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        // Kiểm tra xem mã SP đã tồn tại chưa
        const isCodeDuplicate = products.some(
          p => p.code.toUpperCase() === formCode.trim().toUpperCase() && p.id !== editingProduct?.id
        );
        if (isCodeDuplicate) {
          toast.error("Mã sản phẩm này đã được sử dụng!");
          setLoading(false);
          return;
        }

        await createProduct(payload);
        toast.success("Thêm sản phẩm mới thành công!");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Lỗi khi lưu sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    
    setLoading(true);
    try {
      await deleteProduct(id);
      toast.success("Xóa sản phẩm thành công!");
      fetchProducts();
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (statusVal: string) => {
    const s = STATUSES.find(st => st.value === statusVal);
    return s ? s : { label: statusVal, color: "bg-gray-100 text-gray-700" };
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Header điều khiển */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux">
        {/* Tìm kiếm & Bộ lọc */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm tên, mã sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">Tất cả danh mục</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">Tất cả trạng thái</option>
              {STATUSES.map(st => (
                <option key={st.value} value={st.value}>{st.label}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Nút Thêm */}
        <button
          onClick={openAddModal}
          className="btn-primary flex-shrink-0 cursor-pointer text-xs font-semibold py-2.5 px-5"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Grid danh sách */}
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const statusObj = getStatusLabel(product.status);
            return (
              <div key={product.id} className="glass-card flex flex-col overflow-hidden text-left border">
                {/* Ảnh đại diện sản phẩm */}
                <div className="relative h-60 w-full bg-brand-beige flex items-center justify-center overflow-hidden border-b border-brand-pink-pastel">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-brand-pink-pastel" />
                  )}
                  {/* Trạng thái đính góc */}
                  <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusObj.color}`}>
                    {statusObj.label}
                  </span>
                  
                  {/* Size đính góc phải */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                    Size: {product.size}
                  </span>
                </div>

                {/* Thông tin chi tiết */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold text-primary tracking-wider uppercase">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-text-dark text-sm truncate" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-text-gray font-medium">
                      Mã: <span className="text-text-dark font-semibold">{product.code}</span> | Màu: <span className="font-semibold">{product.color}</span>
                    </p>
                    <p className="text-xs text-text-gray font-medium">
                      Cọc: <span className="text-text-muted font-semibold">{formatVND(product.deposit)}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-pink-pastel/50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-text-gray uppercase tracking-wider font-semibold">Giá thuê/ngày</p>
                      <p className="text-sm font-bold text-primary heading-serif">
                        {formatVND(product.rentalPrice)}
                      </p>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer"
                        title="Sửa sản phẩm"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id!)}
                        className="p-1.5 border border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux">
          <ImageIcon className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
          <p className="text-sm text-text-muted font-medium">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
        </div>
      )}

      {/* Modal Thêm/Sửa sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-brand-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="heading-serif text-xl font-bold text-text-dark">
                {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Váy dạ hội đuôi cá kim sa"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Mã sản phẩm *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProduct}
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="D001"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white disabled:bg-brand-beige"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Danh mục *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                  >
                    {categories.length > 0 ? (
                      categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    ) : (
                      <option value="">Chưa có danh mục — vào Cài đặt để tạo</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Size *</label>
                    <select
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                    >
                      {SIZES.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Màu sắc *</label>
                    <input
                      type="text"
                      required
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      placeholder="Trắng, Hồng pastel..."
                      className="w-full px-3 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Giá thuê/ngày (VND) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formRentalPrice || ""}
                    onChange={(e) => setFormRentalPrice(Number(e.target.value))}
                    placeholder="300000"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Tiền cọc (VND)</label>
                  <input
                    type="number"
                    min={0}
                    value={formDeposit || ""}
                    onChange={(e) => setFormDeposit(Number(e.target.value))}
                    placeholder="500000"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>

                {editingProduct && (
                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Trạng thái sản phẩm</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as ProductData["status"])}
                      className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                    >
                      {STATUSES.map(st => (
                        <option key={st.value} value={st.value}>{st.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Link Video (Tùy chọn)</label>
                  <input
                    type="url"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/shorts/..."
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Mô tả sản phẩm</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Váy chất liệu kim sa bóng, co giãn tốt, thích hợp chụp ảnh dạ hội..."
                  className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white resize-none"
                />
              </div>

              {/* Tải ảnh lên Storage & Dán link dự phòng */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-text-dark uppercase">Ảnh sản phẩm</label>
                
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Thumbnail danh sách ảnh đã up */}
                  {formImages.map((imgUrl, index) => (
                    <div key={index} className="relative w-16 h-16 rounded-lg border border-brand-pink-pastel overflow-hidden group">
                      <img src={imgUrl} alt="Product preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        title="Xóa ảnh"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Nút Upload */}
                  <label className="w-16 h-16 border border-dashed border-brand-pink-pastel rounded-lg bg-brand-pink/20 hover:bg-brand-pink/30 flex flex-col items-center justify-center text-text-muted hover:text-primary cursor-pointer transition-all duration-200">
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-brand-pink border-t-primary rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span className="text-[9px] font-bold mt-1">Tải ảnh</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Nhập link ảnh online dự phòng */}
                <div className="flex gap-2 items-center pt-1">
                  <input
                    type="url"
                    id="imageUrlInput"
                    placeholder="Hoặc dán link ảnh từ mạng (ví dụ: https://images.unsplash.com/...)"
                    className="flex-1 px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          setFormImages((prev) => [...prev, val]);
                          (e.target as HTMLInputElement).value = "";
                          toast.success("Đã thêm link ảnh!");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("imageUrlInput") as HTMLInputElement;
                      const val = input.value.trim();
                      if (val) {
                        setFormImages((prev) => [...prev, val]);
                        input.value = "";
                        toast.success("Đã thêm link ảnh!");
                      } else {
                        toast.error("Vui lòng nhập link ảnh trước.");
                      }
                    }}
                    className="btn-secondary py-1.5 px-4 text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Thêm link
                  </button>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="pt-4 border-t border-brand-pink-pastel flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Lưu sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

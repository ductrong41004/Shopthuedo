"use client";

import React, { useState, useEffect } from "react";
import { getProducts, ProductData } from "@/lib/services/products";
import { 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ImageIcon, 
  Tag,
  Maximize2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Không hardcode danh mục — sẽ tự động sinh từ dữ liệu sản phẩm thực tế

interface GalleryItem {
  id: string; // Product ID
  code: string; // Product Code
  name: string;
  category: string;
  url: string; // Image URL
  videoUrl?: string;
  imageIndex: number;
}

export default function AlbumPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      
      // Tự động sinh danh sách tab danh mục từ dữ liệu thực tế
      const uniqueCategories = Array.from(
        new Set(data.map(p => p.category).filter(Boolean))
      ).sort();
      setCategories(["Tất cả", ...uniqueCategories]);
      
      // Chuyển đổi sản phẩm thành gallery items (1 item per ảnh)
      const items: GalleryItem[] = [];
      data.forEach(p => {
        if (p.images && p.images.length > 0) {
          p.images.forEach((imgUrl, idx) => {
            items.push({
              id: p.id!,
              code: p.code,
              name: p.name,
              category: p.category,
              url: imgUrl,
              videoUrl: p.videoUrl,
              imageIndex: idx
            });
          });
        }
      });
      
      setGalleryItems(items);
      setFilteredItems(items);
    } catch (error) {
      toast.error("Không thể tải danh sách ảnh từ kho sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Lọc theo danh mục
  useEffect(() => {
    if (activeCategory === "Tất cả") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
    }
    setLightboxIndex(null);
  }, [activeCategory, galleryItems]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Tabs Danh mục — tự động sinh từ dữ liệu thực tế */}
      <div className="flex flex-wrap gap-2 pb-2 justify-center sm:justify-start border-b border-brand-pink-pastel/60">
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

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        // Grid dạng Gallery Pinterest/Lưới
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.id}_${item.imageIndex}`}
              onClick={() => setLightboxIndex(index)}
              className="glass-card overflow-hidden group cursor-pointer border relative aspect-[3/4]"
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/90 text-white text-[9px] font-bold">
                    <Tag className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <h4 className="text-white text-sm font-bold truncate">{item.name}</h4>
                  <p className="text-brand-pink text-xs font-semibold">Mã: {item.code}</p>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  {item.videoUrl && (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux">
          <ImageIcon className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
          <p className="text-sm text-text-muted font-medium">Chưa có ảnh nào trong kho danh mục này.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Điều hướng trái */}
          <button
            onClick={handlePrev}
            className="absolute left-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Vùng hiển thị trung tâm */}
          <div className="max-w-4xl max-h-[80vh] w-full flex flex-col md:flex-row gap-6 bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6 border border-zinc-800">
            {/* Trình chiếu ảnh / Video */}
            <div className="flex-1 bg-black flex items-center justify-center rounded-xl overflow-hidden relative aspect-square md:aspect-auto md:h-[60vh]">
              {filteredItems[lightboxIndex].videoUrl ? (
                // Nếu có video, cho phép phát video
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <video
                    src={filteredItems[lightboxIndex].videoUrl}
                    controls
                    className="max-w-full max-h-full"
                    poster={filteredItems[lightboxIndex].url}
                  />
                </div>
              ) : (
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Thông tin bên phải */}
            <div className="w-full md:w-80 flex flex-col justify-between text-left text-zinc-300">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-pink-950/40 text-pink-400 px-2 py-0.5 rounded border border-pink-900/50">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-xl font-bold text-white heading-serif mt-2">
                    {filteredItems[lightboxIndex].name}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-400 mt-1">
                    Mã sản phẩm: <span className="text-white">{filteredItems[lightboxIndex].code}</span>
                  </p>
                </div>
                
                <div className="h-px bg-zinc-800"></div>

                <div className="text-xs space-y-2">
                  <p>• Album đồ này tự động đồng bộ hóa với ảnh kho hàng.</p>
                  <p>• Bạn có thể sửa sản phẩm tại mục 👗 Sản phẩm để cập nhật hoặc thêm ảnh mới.</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  Đóng thư viện
                </button>
              </div>
            </div>
          </div>

          {/* Điều hướng phải */}
          <button
            onClick={handleNext}
            className="absolute right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders,
  CustomerData
} from "@/lib/services/customers";
import { OrderData } from "@/lib/services/orders";
import { 
  Plus, 
  Search, 
  User, 
  Phone, 
  Globe, 
  MessageCircle, 
  MapPin, 
  FileText, 
  Edit, 
  Trash2, 
  X, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerData[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [rentalHistory, setRentalHistory] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Mobile navigation: list vs details
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formFacebook, setFormFacebook] = useState("");
  const [formZalo, setFormZalo] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
      // Giữ lựa chọn khách hàng nếu có
      if (selectedCustomer) {
        const updated = data.find(c => c.id === selectedCustomer.id);
        if (updated) {
          setSelectedCustomer(updated);
        }
      } else if (data.length > 0) {
        setSelectedCustomer(data[0]);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Tải lịch sử đơn thuê khi chọn khách hàng
  useEffect(() => {
    if (selectedCustomer && selectedCustomer.id) {
      const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
          const history = await getCustomerOrders(selectedCustomer.id!);
          setRentalHistory(history);
        } catch (error) {
          console.error("Lỗi khi tải lịch sử thuê:", error);
        } finally {
          setHistoryLoading(false);
        }
      };
      fetchHistory();
    } else {
      setRentalHistory([]);
    }
  }, [selectedCustomer]);

  // Bộ lọc tìm kiếm
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const s = search.toLowerCase();
      setFilteredCustomers(
        customers.filter(
          c => c.name.toLowerCase().includes(s) || c.phone.includes(s)
        )
      );
    }
  }, [search, customers]);

  const openAddModal = () => {
    setEditingCustomer(null);
    setFormName("");
    setFormPhone("");
    setFormFacebook("");
    setFormZalo("");
    setFormAddress("");
    setFormNotes("");
    setIsModalOpen(true);
  };

  const openEditModal = (c: CustomerData) => {
    setEditingCustomer(c);
    setFormName(c.name);
    setFormPhone(c.phone);
    setFormFacebook(c.facebook || "");
    setFormZalo(c.zalo || "");
    setFormAddress(c.address || "");
    setFormNotes(c.notes || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      toast.error("Vui lòng điền tên và số điện thoại.");
      return;
    }

    const payload = {
      name: formName.trim(),
      phone: formPhone.trim(),
      facebook: formFacebook.trim(),
      zalo: formZalo.trim(),
      address: formAddress.trim(),
      notes: formNotes.trim()
    };

    setLoading(true);
    try {
      if (editingCustomer && editingCustomer.id) {
        await updateCustomer(editingCustomer.id, payload);
        toast.success("Cập nhật thông tin khách hàng thành công!");
      } else {
        const id = await createCustomer(payload);
        toast.success("Thêm khách hàng thành công!");
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa khách hàng này? Tất cả lịch sử mua hàng sẽ không hiển thị gắn liền nữa.")) return;
    
    setLoading(true);
    try {
      await deleteCustomer(id);
      toast.success("Xóa khách hàng thành công!");
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (error) {
      toast.error("Lỗi khi xóa khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 overflow-hidden animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* CỘT TRÁI: DANH SÁCH KHÁCH HÀNG (Ẩn trên di động khi đang xem chi tiết) */}
      <div className={`w-full md:w-80 lg:w-96 flex flex-col bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden ${
        showDetailsMobile ? "hidden md:flex" : "flex"
      }`}>
        {/* Search & Add */}
        <div className="p-4 border-b border-brand-pink-pastel space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="heading-serif font-bold text-text-dark text-base">Khách hàng</h3>
            <button
              onClick={openAddModal}
              className="btn-primary py-1.5 px-3 text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm mới
            </button>
          </div>
          
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-brand-pink-pastel/40">
          {loading ? (
            <div className="p-8 text-center text-xs text-text-gray">Đang tải...</div>
          ) : filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <div
                key={customer.id}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowDetailsMobile(true);
                }}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors text-left ${
                  selectedCustomer?.id === customer.id 
                    ? "bg-brand-pink/45 border-l-4 border-primary" 
                    : "hover:bg-brand-beige/30"
                }`}
              >
                <div className="space-y-1">
                  <h4 className="font-semibold text-text-dark text-sm">{customer.name}</h4>
                  <p className="text-xs text-text-gray inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {customer.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-text-gray font-semibold uppercase tracking-wider">Tổng chi tiêu</p>
                  <p className="text-xs font-bold text-primary">{formatVND(customer.totalSpent || 0)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-text-gray">Không tìm thấy khách hàng.</div>
          )}
        </div>
      </div>

      {/* CỘT PHẢI: CHI TIẾT KHÁCH HÀNG (Ẩn trên di động khi đang xem danh sách) */}
      <div className={`flex-1 bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden flex flex-col ${
        showDetailsMobile ? "flex" : "hidden md:flex"
      }`}>
        {selectedCustomer ? (
          <>
            {/* Header chi tiết */}
            <div className="p-6 border-b border-brand-pink-pastel flex items-center justify-between bg-brand-beige/20">
              <div className="flex items-center gap-3">
                {/* Nút quay lại trên Mobile */}
                <button
                  onClick={() => setShowDetailsMobile(false)}
                  className="md:hidden p-1.5 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-full bg-brand-pink text-primary flex items-center justify-center font-bold text-lg">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="heading-serif font-bold text-lg text-text-dark">{selectedCustomer.name}</h3>
                  <p className="text-xs text-text-muted">Đăng ký ngày: {selectedCustomer.createdAt?.substring(0, 10) || "N/A"}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(selectedCustomer)}
                  className="p-2 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer"
                  title="Sửa thông tin"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(selectedCustomer.id!)}
                  className="p-2 border border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                  title="Xóa khách hàng"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chi tiết nội dung */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* Thẻ liên hệ nhanh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-text-gray font-semibold uppercase">Số điện thoại</p>
                    <a href={`tel:${selectedCustomer.phone}`} className="text-xs font-bold hover:underline text-text-dark">
                      {selectedCustomer.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-[10px] text-text-gray font-semibold uppercase">Facebook</p>
                    {selectedCustomer.facebook ? (
                      <a href={selectedCustomer.facebook} target="_blank" rel="noopener noreferrer" className="text-xs font-bold hover:underline text-text-dark truncate block max-w-[140px]">
                        Link cá nhân
                      </a>
                    ) : (
                      <span className="text-xs text-text-gray font-medium">Chưa có</span>
                    )}
                  </div>
                </div>

                <div className="bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-[10px] text-text-gray font-semibold uppercase">Zalo</p>
                    {selectedCustomer.zalo ? (
                      <a href={`https://zalo.me/${selectedCustomer.zalo}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold hover:underline text-text-dark">
                        {selectedCustomer.zalo}
                      </a>
                    ) : (
                      <span className="text-xs text-text-gray font-medium">Chưa có</span>
                    )}
                  </div>
                </div>

                <div className="bg-brand-beige border border-brand-pink-pastel rounded-xl p-4 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-accent-gold" />
                  <div>
                    <p className="text-[10px] text-text-gray font-semibold uppercase">Lượt thuê / Chi tiêu</p>
                    <p className="text-xs font-bold text-text-dark">
                      {selectedCustomer.totalOrders} lần / <span className="text-primary">{formatVND(selectedCustomer.totalSpent)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Địa chỉ & ghi chú */}
              <div className="space-y-4">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-text-dark">Địa chỉ khách hàng</h5>
                    <p className="text-xs text-text-muted mt-1">{selectedCustomer.address || "Chưa cập nhật địa chỉ."}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-text-dark">Ghi chú cá nhân</h5>
                    <p className="text-xs text-text-muted mt-1 italic">
                      {selectedCustomer.notes || "Không có ghi chú nào."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-brand-pink-pastel"></div>

              {/* Lịch sử thuê đồ */}
              <div className="space-y-4">
                <h4 className="heading-serif font-bold text-base text-text-dark flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Lịch sử thuê trang phục
                </h4>

                {historyLoading ? (
                  <div className="py-6 text-center text-xs text-text-gray">Đang tải lịch sử...</div>
                ) : rentalHistory.length > 0 ? (
                  <div className="border border-brand-pink-pastel rounded-xl overflow-hidden divide-y divide-brand-pink-pastel/40">
                    {rentalHistory.map(order => (
                      <div key={order.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-brand-beige/10">
                        <div className="text-left space-y-1">
                          <p className="font-semibold text-text-dark text-xs sm:text-sm">
                            {order.productName} ({order.productCode})
                          </p>
                          <p className="text-[11px] text-text-gray">
                            Thời gian: <span className="font-semibold text-text-dark">{order.startDate}</span> đến <span className="font-semibold text-text-dark">{order.endDate}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-left sm:text-right">
                            <p className="text-[10px] text-text-gray font-semibold">Tiền thuê</p>
                            <p className="text-xs font-bold text-primary">{formatVND(order.rentalFee)}</p>
                          </div>
                          
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            order.status === "RETURNED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            order.status === "RENTING" ? "bg-pink-50 text-primary border-brand-pink-pastel" :
                            order.status === "OVERDUE" ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                            {order.status === "RETURNED" ? "Đã trả" :
                             order.status === "RENTING" ? "Đang thuê" :
                             order.status === "OVERDUE" ? "Quá hạn" : "Đặt trước"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-brand-beige/10 border border-dashed border-brand-pink-pastel rounded-xl p-8 text-center text-xs text-text-gray">
                    Khách hàng này chưa từng phát sinh đơn thuê đồ.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-text-muted">
            <User className="w-16 h-16 text-brand-pink-pastel mb-4" />
            <p className="text-sm font-semibold">Vui lòng chọn khách hàng để xem chi tiết.</p>
          </div>
        )}
      </div>

      {/* Modal Thêm/Sửa thông tin khách hàng */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-brand-white w-full max-w-lg overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="heading-serif text-xl font-bold text-text-dark">
                {editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Tên khách hàng *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nguyễn Thị Kim Anh"
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Facebook Link</label>
                  <input
                    type="url"
                    value={formFacebook}
                    onChange={(e) => setFormFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Zalo (SĐT)</label>
                  <input
                    type="text"
                    value={formZalo}
                    onChange={(e) => setFormZalo(e.target.value)}
                    placeholder="0912345678"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Địa chỉ khách hàng</label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="Khách sạn Novotel Phú Quốc, Dương Tơ..."
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ghi chú</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Khách VIP, thường thích đầm phong cách Boho đi biển, giữ đồ cẩn thận..."
                  className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-brand-pink-pastel bg-brand-white resize-none"
                />
              </div>

              {/* Footer Modal */}
              <div className="pt-4 border-t border-brand-pink-pastel flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Lưu khách hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

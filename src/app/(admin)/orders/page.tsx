"use client";

import React, { useState, useEffect } from "react";
import {
  getOrders,
  createOrder,
  returnOrder,
  deleteOrder,
  checkProductAvailability,
  autoUpdateOrderStatus,
  OrderData,
  ReturnDetails
} from "@/lib/services/orders";
import { getProducts, ProductData } from "@/lib/services/products";
import { getCustomers, createCustomer, CustomerData } from "@/lib/services/customers";
import {
  Plus,
  Search,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Sparkles,
  X,
  User,
  Shirt,
  DollarSign,
  UserPlus
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeTab, setActiveTab] = useState<"ALL" | "RESERVED" | "RENTING" | "OVERDUE" | "RETURNED">("ALL");
  const [search, setSearch] = useState("");

  // Create Order Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentalFee, setRentalFee] = useState(0);
  const [depositFee, setDepositFee] = useState(0);
  const [orderNotes, setOrderNotes] = useState("");
  const [rentalDays, setRentalDays] = useState(0);
  const [orderStatus, setOrderStatus] = useState<"RESERVED" | "RENTING">("RESERVED");

  // Overlap Alert State
  const [overlapError, setOverlapError] = useState<string | null>(null);

  // Return Modal State
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returningOrder, setReturningOrder] = useState<OrderData | null>(null);
  const [returnCondition, setReturnCondition] = useState<ReturnDetails["condition"]>("good");
  const [extraFee, setExtraFee] = useState(0);
  const [compensation, setCompensation] = useState(0);
  const [returnNotes, setReturnNotes] = useState("");

  // Quick Customer Creation inline
  const [isQuickCustomerOpen, setIsQuickCustomerOpen] = useState(false);
  const [quickCustName, setQuickCustName] = useState("");
  const [quickCustPhone, setQuickCustPhone] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      await autoUpdateOrderStatus();
      const [oList, pList, cList] = await Promise.all([
        getOrders(),
        getProducts(),
        getCustomers()
      ]);
      setOrders(oList);
      setFilteredOrders(oList);
      setProducts(pList);
      setCustomers(cList);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu từ hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Bộ lọc theo Tab & Ô Tìm kiếm
  useEffect(() => {
    let result = orders;

    if (activeTab !== "ALL") {
      result = result.filter(o => o.status === activeTab);
    }

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      result = result.filter(
        o =>
          o.customerName.toLowerCase().includes(s) ||
          o.productCode.toLowerCase().includes(s) ||
          o.productName.toLowerCase().includes(s)
      );
    }

    setFilteredOrders(result);
  }, [activeTab, search, orders]);

  // Tự động tính số ngày thuê và đề xuất tiền thuê/tiền cọc
  useEffect(() => {
    if (startDate && endDate && selectedProductId) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      
      if (diffTime >= 0) {
        const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // Số ngày = Ngày trả - Ngày nhận (tối thiểu 1 ngày)
        setRentalDays(days);

        const prod = products.find(p => p.id === selectedProductId);
        if (prod) {
          setRentalFee(prod.rentalPrice * days);
          setDepositFee(prod.deposit);
        }
        
        // Check trùng lịch ngay khi nhập ngày
        checkAvailability(selectedProductId, startDate, endDate);
      } else {
        setRentalDays(0);
        setRentalFee(0);
        setDepositFee(0);
        setOverlapError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      }
    } else {
      setRentalDays(0);
      setOverlapError(null);
    }
  }, [startDate, endDate, selectedProductId, products]);

  // Check trùng lịch thuê
  const checkAvailability = async (prodId: string, start: string, end: string) => {
    try {
      const res = await checkProductAvailability(prodId, start, end);
      if (!res.available) {
        setOverlapError(
          `Sản phẩm đã bị đặt bởi khách ${res.conflictingOrder.customerName} từ ${res.conflictingOrder.startDate} đến ${res.conflictingOrder.endDate}.`
        );
      } else {
        setOverlapError(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateModal = () => {
    setSelectedCustomerId("");
    setSelectedProductId("");
    setStartDate("");
    setEndDate("");
    setRentalFee(0);
    setDepositFee(0);
    setOrderNotes("");
    setOrderStatus("RESERVED");
    setOverlapError(null);
    setIsCreateModalOpen(true);
  };

  // Tạo nhanh khách hàng inline
  const handleQuickCustomerCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCustName || !quickCustPhone) {
      toast.error("Vui lòng nhập tên và SĐT khách.");
      return;
    }

    try {
      const newCustId = await createCustomer({
        name: quickCustName.trim(),
        phone: quickCustPhone.trim(),
        facebook: "",
        zalo: "",
        address: ""
      });
      
      // Reload danh sách khách
      const updatedCustList = await getCustomers();
      setCustomers(updatedCustList);
      
      // Tự động chọn khách hàng vừa tạo
      setSelectedCustomerId(newCustId);
      
      // Reset form nhanh
      setQuickCustName("");
      setQuickCustPhone("");
      setIsQuickCustomerOpen(false);
      toast.success("Đã thêm nhanh khách hàng!");
    } catch (error) {
      toast.error("Lỗi khi thêm nhanh khách hàng.");
    }
  };

  // Submit tạo đơn thuê
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !selectedProductId || !startDate || !endDate || rentalFee <= 0) {
      toast.error("Vui lòng điền đầy đủ thông tin đơn hàng.");
      return;
    }

    if (overlapError) {
      toast.error("Không thể tạo đơn hàng do lịch bị trùng lặp!");
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomerId);
    const product = products.find(p => p.id === selectedProductId);

    if (!customer || !product) {
      toast.error("Khách hàng hoặc sản phẩm không hợp lệ.");
      return;
    }

    const payload: Omit<OrderData, "id" | "createdAt"> = {
      customerId: selectedCustomerId,
      customerName: customer.name,
      customerPhone: customer.phone,
      productId: selectedProductId,
      productCode: product.code,
      productName: product.name,
      productImage: product.images?.[0] || "",
      startDate,
      endDate,
      rentalFee,
      depositFee,
      totalPrice: rentalFee,
      status: orderStatus,
      notes: orderNotes
    };

    setLoading(true);
    try {
      await createOrder(payload);
      toast.success("Tạo đơn hàng thành công!");
      setIsCreateModalOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Không thể tạo đơn: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mở modal trả đồ
  const openReturnModal = (order: OrderData) => {
    setReturningOrder(order);
    setReturnCondition("good");
    setExtraFee(0);
    setCompensation(0);
    setReturnNotes("");
    setIsReturnModalOpen(true);
  };

  // Submit trả đồ
  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returningOrder) return;

    const details: ReturnDetails = {
      condition: returnCondition,
      extraFee: Number(extraFee),
      compensation: Number(compensation),
      notes: returnNotes.trim(),
      returnedAt: new Date().toISOString().split("T")[0]
    };

    setLoading(true);
    try {
      await returnOrder(returningOrder.id!, returningOrder.productId, details);
      toast.success("Đã hoàn tất trả đồ và thanh toán đơn thuê!");
      setIsReturnModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Lỗi khi xử lý trả đồ.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Bạn có chắc muốn hủy/xóa đơn thuê này không? Trạng thái sản phẩm sẽ tự động khôi phục về Có sẵn.")) return;
    
    setLoading(true);
    try {
      await deleteOrder(id);
      toast.success("Đã xóa đơn thuê.");
      fetchData();
    } catch (error) {
      toast.error("Lỗi khi xóa đơn thuê.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: OrderData["status"]) => {
    switch (status) {
      case "RETURNED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "RENTING":
        return "bg-pink-50 text-primary border-brand-pink-pastel";
      case "OVERDUE":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusText = (status: OrderData["status"]) => {
    switch (status) {
      case "RETURNED": return "Đã trả đồ";
      case "RENTING": return "Đang thuê";
      case "OVERDUE": return "Quá hạn";
      default: return "Đặt trước";
    }
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

      {/* Tabs & Tìm kiếm */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux">
        <div className="flex flex-wrap gap-2">
          {["ALL", "RESERVED", "RENTING", "OVERDUE", "RETURNED"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-brand-white text-text-muted hover:bg-brand-pink hover:text-primary border border-brand-pink-pastel"
              }`}
            >
              {tab === "ALL" ? "Tất cả" : getStatusText(tab as any)}
            </button>
          ))}
        </div>

        <div className="flex w-full lg:w-auto gap-3 items-center">
          <div className="relative flex-1 lg:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm khách hàng, mã SP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
            />
          </div>

          <button onClick={openCreateModal} className="btn-primary py-2.5 px-5 text-xs font-semibold cursor-pointer shrink-0">
            <Plus className="w-4 h-4" /> Tạo đơn thuê
          </button>
        </div>
      </div>

      {/* Danh sách Đơn thuê */}
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="glass-card p-5 border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex gap-4 items-start">
                <div className="w-16 h-20 rounded bg-brand-beige border border-brand-pink-pastel overflow-hidden shrink-0 flex items-center justify-center">
                  {order.productImage ? (
                    <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                  ) : (
                    <Shirt className="w-6 h-6 text-brand-pink-pastel" />
                  )}
                </div>
                <div className="space-y-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusBadge(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <h4 className="font-bold text-text-dark text-sm sm:text-base">
                    {order.productName} ({order.productCode})
                  </h4>
                  <p className="text-xs text-text-gray">
                    Khách hàng: <span className="font-semibold text-text-dark">{order.customerName} ({order.customerPhone})</span>
                  </p>
                  <p className="text-xs text-text-gray inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Lịch thuê: <span className="font-semibold text-text-dark">{order.startDate}</span> đến <span className="font-semibold text-text-dark">{order.endDate}</span></span>
                  </p>
                </div>
              </div>

              {/* Pricing & Operations */}
              <div className="flex flex-row md:flex-col justify-between md:items-end w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-brand-pink-pastel/50 gap-4">
                <div className="text-left md:text-right">
                  <p className="text-[10px] text-text-gray font-semibold uppercase tracking-wider">Tổng tiền thuê</p>
                  <p className="text-base font-bold text-primary heading-serif">{formatVND(order.rentalFee)}</p>
                  <p className="text-[10px] text-text-muted">Cọc: {formatVND(order.depositFee)}</p>
                </div>

                <div className="flex gap-2 items-center">
                  {/* Trả đồ button (chỉ hiển thị khi đang thuê / quá hạn) */}
                  {(order.status === "RENTING" || order.status === "OVERDUE" || order.status === "RESERVED") && (
                    <button
                      onClick={() => openReturnModal(order)}
                      className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-full shadow-sm cursor-pointer"
                    >
                      Trả đồ / Tất toán
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteOrder(order.id!)}
                    className="p-2 border border-red-50 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                    title="Xóa / Hủy đơn"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux">
          <Calendar className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
          <p className="text-sm text-text-muted font-medium">Chưa có đơn thuê nào khớp với bộ lọc.</p>
        </div>
      )}

      {/* Modal Tạo đơn thuê mới */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsCreateModalOpen(false)}></div>
          
          <div className="relative bg-brand-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="heading-serif text-xl font-bold text-text-dark">Tạo đơn đặt thuê mới</h2>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Chọn khách hàng & Tạo nhanh khách hàng */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-text-dark uppercase">Chọn khách hàng *</label>
                  <button
                    type="button"
                    onClick={() => setIsQuickCustomerOpen(!isQuickCustomerOpen)}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Tạo nhanh khách
                  </button>
                </div>

                {isQuickCustomerOpen ? (
                  <div className="bg-brand-pink/20 border border-brand-pink-pastel rounded-xl p-3 space-y-2 mb-2 animate-in slide-in-from-top duration-250">
                    <p className="text-[10px] font-bold text-text-muted uppercase">Tạo nhanh khách hàng mới</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Tên khách hàng"
                        value={quickCustName}
                        onChange={(e) => setQuickCustName(e.target.value)}
                        className="px-3 py-1.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none bg-brand-white"
                      />
                      <input
                        type="tel"
                        placeholder="SĐT liên hệ"
                        value={quickCustPhone}
                        onChange={(e) => setQuickCustPhone(e.target.value)}
                        className="px-3 py-1.5 border border-brand-pink-pastel rounded-full text-xs focus:outline-none bg-brand-white"
                      />
                    </div>
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsQuickCustomerOpen(false)}
                        className="px-2 py-1 text-[10px] text-text-gray font-semibold rounded bg-zinc-200"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={handleQuickCustomerCreate}
                        className="px-2 py-1 text-[10px] bg-primary text-white font-semibold rounded"
                      >
                        Lưu khách
                      </button>
                    </div>
                  </div>
                ) : null}

                <select
                  required
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                >
                  <option value="">-- Chọn khách hàng --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                  ))}
                </select>
              </div>

              {/* Chọn sản phẩm */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Chọn váy đầm / phụ kiện *</label>
                <select
                  required
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.code} - {p.name} (Giá thuê: {formatVND(p.rentalPrice)}) [Size {p.size}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn ngày */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ngày nhận váy *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ngày trả váy *</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
              </div>

              {/* Cảnh báo trùng lịch */}
              {overlapError && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{overlapError}</span>
                </div>
              )}

              {/* Số ngày thuê & Tài chính */}
              <div className="grid grid-cols-4 gap-2 bg-brand-beige/30 p-3 rounded-xl border border-brand-pink-pastel/60 text-[10px] sm:text-xs">
                <div>
                  <p className="text-text-gray font-semibold uppercase">Số ngày</p>
                  <p className="text-sm font-bold text-text-dark mt-1">{rentalDays} ngày</p>
                </div>
                <div>
                  <label className="block text-text-gray font-semibold uppercase mb-1">Tiền thuê *</label>
                  <input
                    type="number"
                    required
                    value={rentalFee}
                    onChange={(e) => setRentalFee(Number(e.target.value))}
                    className="w-full px-2 py-1 border border-brand-pink-pastel rounded text-xs focus:outline-none bg-brand-white"
                  />
                </div>
                <div>
                  <label className="block text-text-gray font-semibold uppercase mb-1">Tiền cọc</label>
                  <input
                    type="number"
                    value={depositFee}
                    onChange={(e) => setDepositFee(Number(e.target.value))}
                    className="w-full px-2 py-1 border border-brand-pink-pastel rounded text-xs focus:outline-none bg-brand-white"
                  />
                </div>
                <div>
                  <label className="block text-text-gray font-semibold uppercase mb-1">Trạng thái *</label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as any)}
                    className="w-full px-1.5 py-1 border border-brand-pink-pastel rounded text-xs focus:outline-none bg-brand-white text-text-dark font-medium cursor-pointer"
                  >
                    <option value="RESERVED">Đặt trước</option>
                    <option value="RENTING">Đang thuê</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ghi chú đơn hàng</label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Yêu cầu là váy ủi phẳng, chuẩn bị thêm móc treo..."
                  className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary bg-brand-white resize-none"
                />
              </div>

              <div className="pt-4 border-t border-brand-pink-pastel flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading || !!overlapError}
                  className="btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tạo đơn hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Trả đồ / Tất toán */}
      {isReturnModalOpen && returningOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsReturnModalOpen(false)}></div>
          
          <div className="relative bg-brand-white w-full max-w-md overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setIsReturnModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h2 className="heading-serif text-xl font-bold text-text-dark">Nhận trả đồ & Tất toán</h2>
            </div>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div className="bg-brand-pink/10 border border-brand-pink-pastel/60 rounded-xl p-3 text-xs space-y-1">
                <p>Khách hàng: <span className="font-bold text-text-dark">{returningOrder.customerName}</span></p>
                <p>Sản phẩm: <span className="font-bold text-text-dark">{returningOrder.productName} ({returningOrder.productCode})</span></p>
                <p>Tiền cọc đang giữ: <span className="font-bold text-primary">{formatVND(returningOrder.depositFee)}</span></p>
              </div>

              {/* Checklist tình trạng đồ */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-dark uppercase">Tình trạng đồ khi trả *</label>
                <select
                  value={returnCondition}
                  onChange={(e) => setReturnCondition(e.target.value as any)}
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                >
                  <option value="good">Đúng hạn & Hoàn hảo</option>
                  <option value="late">Trễ hạn</option>
                  <option value="damaged">Hỏng hóc/Rách váy</option>
                  <option value="lost_accessories">Mất phụ kiện đính kèm</option>
                </select>
              </div>

              {/* Phụ thu & Đền bù */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Phụ thu (Ví dụ: trễ hạn)</label>
                  <input
                    type="number"
                    min={0}
                    value={extraFee || ""}
                    onChange={(e) => setExtraFee(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Bồi thường (Rách/mất)</label>
                  <input
                    type="number"
                    min={0}
                    value={compensation || ""}
                    onChange={(e) => setCompensation(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ghi chú tình trạng trả</label>
                <textarea
                  rows={2}
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Khách trả trễ 1 ngày / Có vết bẩn nhẹ giặt được..."
                  className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary bg-brand-white resize-none"
                />
              </div>

              {/* Lưu ý hoàn cọc */}
              <p className="text-[10px] text-text-muted italic bg-brand-beige p-2.5 rounded border border-brand-pink-pastel">
                Hệ thống sẽ tự động ghi chép hoàn trả lại khoản tiền cọc {formatVND(returningOrder.depositFee)} vào sổ quỹ Thu Chi chi tiết.
              </p>

              <div className="pt-4 border-t border-brand-pink-pastel flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReturnModalOpen(false)}
                  className="btn-secondary cursor-pointer text-xs font-semibold py-2.5 px-5"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100"
                >
                  Xác nhận trả đồ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  getFinancialRecords,
  createFinancialRecord,
  deleteFinancialRecord,
  FinancialRecord
} from "@/lib/services/finance";
import { 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Trash2, 
  X, 
  Sparkles, 
  Calendar,
  Filter
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const INFLOW_CATEGORIES = ["Tiền thuê", "Tiền cọc", "Bán sản phẩm", "Bồi thường"];
const OUTFLOW_CATEGORIES = ["Nhập hàng", "Giặt ủi", "Sửa chữa", "Marketing", "Chi phí khác"];

export default function FinancePage() {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Thống kê sổ quỹ
  const [totalInflow, setTotalInflow] = useState(0);
  const [totalOutflow, setTotalOutflow] = useState(0);

  // Bộ lọc
  const [selectedType, setSelectedType] = useState<"ALL" | "INFLOW" | "OUTFLOW">("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<"INFLOW" | "OUTFLOW">("INFLOW");
  const [formCategory, setFormCategory] = useState(INFLOW_CATEGORIES[0]);
  const [formAmount, setFormAmount] = useState(0);
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formNotes, setFormNotes] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getFinancialRecords();
      setRecords(data);
      setFilteredRecords(data);

      // Tính toán thống kê
      let inflowSum = 0;
      let outflowSum = 0;
      data.forEach(r => {
        if (r.type === "INFLOW") inflowSum += r.amount;
        else outflowSum += r.amount;
      });
      setTotalInflow(inflowSum);
      setTotalOutflow(outflowSum);
    } catch (error) {
      toast.error("Không thể tải sổ quỹ thu chi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Thay đổi loại phiếu thì tự reset danh mục tương ứng
  useEffect(() => {
    if (formType === "INFLOW") {
      setFormCategory(INFLOW_CATEGORIES[0]);
    } else {
      setFormCategory(OUTFLOW_CATEGORIES[0]);
    }
  }, [formType]);

  // Bộ lọc tìm kiếm & Phân loại
  useEffect(() => {
    let result = records;

    if (selectedType !== "ALL") {
      result = result.filter(r => r.type === selectedType);
    }

    if (selectedCategory !== "ALL") {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      result = result.filter(r => r.notes?.toLowerCase().includes(s));
    }

    setFilteredRecords(result);
  }, [selectedType, selectedCategory, search, records]);

  // Submit tạo phiếu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formAmount <= 0 || !formCategory || !formDate) {
      toast.error("Vui lòng nhập đầy đủ số tiền, danh mục và ngày lập.");
      return;
    }

    const payload = {
      type: formType,
      category: formCategory as any,
      amount: Number(formAmount),
      date: formDate,
      notes: formNotes.trim()
    };

    setLoading(true);
    try {
      await createFinancialRecord(payload);
      toast.success("Lập phiếu thu/chi thành công!");
      setIsModalOpen(false);
      
      // Reset form
      setFormAmount(0);
      setFormNotes("");
      setFormDate(new Date().toISOString().split("T")[0]);
      
      fetchRecords();
    } catch (error) {
      toast.error("Không thể lưu phiếu thu/chi.");
    } finally {
      setLoading(false);
    }
  };

  // Xóa phiếu
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phiếu thu/chi này không? Số dư quỹ sẽ được tính toán lại.")) return;
    
    setLoading(true);
    try {
      await deleteFinancialRecord(id);
      toast.success("Đã xóa phiếu thu/chi.");
      fetchRecords();
    } catch (error) {
      toast.error("Không thể xóa phiếu.");
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
    <div className="space-y-6 animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Sổ quỹ thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border flex items-center justify-between">
          <div className="text-left space-y-1">
            <span className="text-xs font-semibold text-text-gray tracking-wider uppercase">Tổng thu nhập</span>
            <h4 className="text-2xl font-bold text-emerald-600 heading-serif">{formatVND(totalInflow)}</h4>
            <p className="text-[10px] text-text-muted">Bao gồm thuê đồ, cọc, bán sản phẩm</p>
          </div>
          <span className="p-3 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100">
            <TrendingUp className="w-6 h-6" />
          </span>
        </div>

        <div className="glass-card p-6 border flex items-center justify-between">
          <div className="text-left space-y-1">
            <span className="text-xs font-semibold text-text-gray tracking-wider uppercase">Tổng chi ra</span>
            <h4 className="text-2xl font-bold text-red-600 heading-serif">{formatVND(totalOutflow)}</h4>
            <p className="text-[10px] text-text-muted">Nhập đồ, giặt ủi, sửa váy, marketing</p>
          </div>
          <span className="p-3 bg-red-50 rounded-full text-red-600 border border-red-100">
            <TrendingDown className="w-6 h-6" />
          </span>
        </div>

        <div className="glass-card p-6 border flex items-center justify-between bg-brand-pink/20">
          <div className="text-left space-y-1">
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">Sổ quỹ tồn (Còn lại)</span>
            <h4 className="text-2xl font-bold text-primary heading-serif">{formatVND(totalInflow - totalOutflow)}</h4>
            <p className="text-[10px] text-text-muted">Quỹ tiền mặt khả dụng hiện tại</p>
          </div>
          <span className="p-3 bg-primary text-white rounded-full shadow-md shadow-pink-100">
            <Wallet className="w-6 h-6" />
          </span>
        </div>
      </div>

      {/* Điều khiển bộ lọc & Tạo phiếu */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux">
        
        {/* Tìm kiếm & Loại phiếu */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm theo ghi chú..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white"
            />
          </div>

          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as any);
                setSelectedCategory("ALL"); // Reset category filter
              }}
              className="pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">Tất cả phiếu</option>
              <option value="INFLOW">Phiếu Thu (+)</option>
              <option value="OUTFLOW">Phiếu Chi (-)</option>
            </select>
            <Filter className="absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-8 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">Tất cả danh mục</option>
              {selectedType !== "OUTFLOW" && INFLOW_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              {selectedType !== "INFLOW" && OUTFLOW_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-3 w-3 h-3 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Lập phiếu */}
        <button
          onClick={() => {
            setFormType("INFLOW");
            setIsModalOpen(true);
          }}
          className="btn-primary cursor-pointer text-xs font-semibold py-2.5 px-5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Lập phiếu Thu / Chi
        </button>
      </div>

      {/* Sổ quỹ chi tiết bảng biểu */}
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-brand-beige/20 border-b border-brand-pink-pastel text-xs font-bold text-text-dark">
                  <th className="px-6 py-4 text-left">Ngày lập</th>
                  <th className="px-6 py-4 text-left">Loại phiếu</th>
                  <th className="px-6 py-4 text-left">Danh mục</th>
                  <th className="px-6 py-4 text-left">Số tiền</th>
                  <th className="px-6 py-4 text-left">Ghi chú</th>
                  <th className="px-6 py-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pink-pastel/30">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-brand-beige/5">
                    <td className="px-6 py-4 font-medium text-text-dark whitespace-nowrap">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        record.type === "INFLOW"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {record.type === "INFLOW" ? "Thu nhập (+)" : "Chi ra (-)"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-text-dark whitespace-nowrap">
                      {record.category}
                    </td>
                    <td className={`px-6 py-4 font-bold whitespace-nowrap ${
                      record.type === "INFLOW" ? "text-emerald-600" : "text-red-500"
                    }`}>
                      {record.type === "INFLOW" ? "+" : "-"}{formatVND(record.amount)}
                    </td>
                    <td className="px-6 py-4 text-text-muted text-xs max-w-xs truncate" title={record.notes}>
                      {record.notes || "---"}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(record.id!)}
                        className="p-1.5 border border-red-50 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                        title="Xóa phiếu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux">
          <Wallet className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
          <p className="text-sm text-text-muted font-medium">Chưa có giao dịch thu chi nào.</p>
        </div>
      )}

      {/* Modal Lập Phiếu Thu Chi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-brand-white w-full max-w-md overflow-y-auto rounded-2xl border border-brand-pink shadow-lux-lg animate-in zoom-in-95 duration-200 p-6 md:p-8 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="heading-serif text-xl font-bold text-text-dark">Lập phiếu thu / chi</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Loại phiếu */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-dark uppercase">Loại giao dịch *</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-brand-pink/35 rounded-full border border-brand-pink-pastel/60">
                  <button
                    type="button"
                    onClick={() => setFormType("INFLOW")}
                    className={`py-2 rounded-full text-xs font-semibold cursor-pointer ${
                      formType === "INFLOW"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-text-muted"
                    }`}
                  >
                    Phiếu Thu (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("OUTFLOW")}
                    className={`py-2 rounded-full text-xs font-semibold cursor-pointer ${
                      formType === "OUTFLOW"
                        ? "bg-red-600 text-white shadow-sm"
                        : "text-text-muted"
                    }`}
                  >
                    Phiếu Chi (-)
                  </button>
                </div>
              </div>

              {/* Danh mục */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Danh mục nghiệp vụ *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark font-medium cursor-pointer"
                >
                  {formType === "INFLOW"
                    ? INFLOW_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                    : OUTFLOW_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                  }
                </select>
              </div>

              {/* Số tiền */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Số tiền giao dịch (VND) *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray font-bold text-xs">
                    đ
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formAmount || ""}
                    onChange={(e) => setFormAmount(Number(e.target.value))}
                    placeholder="250000"
                    className="w-full pl-8 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
              </div>

              {/* Ngày lập phiếu */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ngày ghi nhận *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-gray">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-brand-pink-pastel rounded-full text-xs focus:outline-none focus:border-primary bg-brand-white text-text-dark"
                  />
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1.5 uppercase">Ghi chú phiếu</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Ví dụ: Giặt ủi đầm tiệc D001 / Bán hoa sáp đi kèm..."
                  className="w-full px-4 py-2.5 border border-brand-pink-pastel rounded-2xl text-xs focus:outline-none focus:border-primary bg-brand-white resize-none text-text-dark"
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
                  Tạo phiếu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

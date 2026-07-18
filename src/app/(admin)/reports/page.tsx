"use client";

import React, { useState, useEffect } from "react";
import { getReportStats } from "@/lib/services/finance";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Heart,
  Calendar,
  Sparkles
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ReportsPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const stats = await getReportStats(year);
      setData(stats);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu báo cáo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [year]);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Custom Tooltip cho Recharts để hiển thị Tiền tệ VND đẹp mắt
  const CustomTooltipCurrency = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-white border border-brand-pink-pastel p-3 rounded-lg shadow-lux text-xs text-left">
          <p className="font-bold text-text-dark mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-medium" style={{ color: entry.color }}>
              {entry.name}: {formatVND(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipCount = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-white border border-brand-pink-pastel p-3 rounded-lg shadow-lux text-xs text-left">
          <p className="font-bold text-text-dark mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-medium text-primary">
              {entry.name}: {entry.value} lượt
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading && !data) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Điều khiển năm */}
      <div className="flex justify-between items-center bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux">
        <div className="flex items-center gap-2 text-left">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="heading-serif font-bold text-base text-text-dark">Báo cáo hoạt động</h3>
            <p className="text-[10px] text-text-muted">Biểu đồ kết quả kinh doanh và bảng xếp hạng</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-gray" />
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="pl-3 pr-8 py-1.5 border border-brand-pink-pastel rounded-full text-xs font-semibold focus:outline-none bg-brand-white text-text-dark cursor-pointer"
          >
            {[2025, 2026, 2027, 2028].map(y => (
              <option key={y} value={y}>Năm {y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biểu đồ Doanh thu & Chi phí */}
        <div className="glass-card p-6 flex flex-col min-h-[360px] text-left">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-brand-pink-pastel/60">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h4 className="font-bold text-text-dark heading-serif">Doanh thu & Chi phí</h4>
          </div>

          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data?.revenueChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FCE7F3" />
                <XAxis dataKey="month" stroke="#831843" fontSize={10} tickLine={false} />
                <YAxis stroke="#831843" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltipCurrency />} />
                <Legend iconSize={10} wrapperStyle={{ paddingTop: 10 }} />
                <Bar name="Doanh thu" dataKey="revenue" fill="#DB2777" radius={[4, 4, 0, 0]} />
                <Bar name="Chi phí" dataKey="expense" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ số lượt thuê */}
        <div className="glass-card p-6 flex flex-col min-h-[360px] text-left">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-brand-pink-pastel/60">
            <Heart className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-text-dark heading-serif">Số lượt thuê đầm</h4>
          </div>

          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data?.rentalChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FCE7F3" />
                <XAxis dataKey="month" stroke="#831843" fontSize={10} tickLine={false} />
                <YAxis stroke="#831843" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltipCount />} />
                <Legend iconSize={10} wrapperStyle={{ paddingTop: 10 }} />
                <Line name="Lượt thuê" type="monotone" dataKey="count" stroke="#DB2777" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bảng Xếp hạng / Top performers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 text-left">
        {/* Top 5 Sản phẩm */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-brand-pink-pastel/60 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-text-dark heading-serif">Sản phẩm thuê nhiều nhất</h4>
          </div>

          <div className="divide-y divide-brand-pink-pastel/40 overflow-x-auto">
            {data?.topProducts && data.topProducts.length > 0 ? (
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-text-gray font-bold">
                    <th className="pb-3 text-left">Hạng</th>
                    <th className="pb-3 text-left">Trang phục</th>
                    <th className="pb-3 text-center">Số lượt thuê</th>
                    <th className="pb-3 text-right">Tổng thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink-pastel/30">
                  {data.topProducts.map((prod: any, idx: number) => (
                    <tr key={prod.code} className="hover:bg-brand-beige/10">
                      <td className="py-3 font-bold text-primary">#{idx + 1}</td>
                      <td className="py-3">
                        <p className="font-bold text-text-dark">{prod.name}</p>
                        <p className="text-[10px] text-text-gray">Mã: {prod.code}</p>
                      </td>
                      <td className="py-3 text-center font-semibold text-text-dark">{prod.count} lần</td>
                      <td className="py-3 text-right font-bold text-primary">{formatVND(prod.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-xs text-text-gray">Chưa phát sinh dữ liệu cho bảng xếp hạng.</div>
            )}
          </div>
        </div>

        {/* Top 5 Khách hàng VIP */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-brand-pink-pastel/60 mb-4">
            <Sparkles className="w-5 h-5 text-accent-gold" />
            <h4 className="font-bold text-text-dark heading-serif">Khách hàng VIP (Chi tiêu nhiều nhất)</h4>
          </div>

          <div className="divide-y divide-brand-pink-pastel/40 overflow-x-auto">
            {data?.vipCustomers && data.vipCustomers.length > 0 ? (
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-text-gray font-bold">
                    <th className="pb-3 text-left">Hạng</th>
                    <th className="pb-3 text-left">Khách hàng</th>
                    <th className="pb-3 text-center">Số lần thuê</th>
                    <th className="pb-3 text-right">Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink-pastel/30">
                  {data.vipCustomers.map((cust: any, idx: number) => (
                    <tr key={cust.phone} className="hover:bg-brand-beige/10">
                      <td className="py-3 font-bold text-accent-gold">#{idx + 1}</td>
                      <td className="py-3">
                        <p className="font-bold text-text-dark">{cust.name}</p>
                        <p className="text-[10px] text-text-gray">SĐT: {cust.phone}</p>
                      </td>
                      <td className="py-3 text-center font-semibold text-text-dark">{cust.count} lần</td>
                      <td className="py-3 text-right font-bold text-primary">{formatVND(cust.spent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-xs text-text-gray">Chưa phát sinh dữ liệu khách hàng VIP.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

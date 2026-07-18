"use client";

import React, { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/services/finance";
import { autoUpdateOrderStatus } from "@/lib/services/orders";
import Link from "next/link";
import {
  TrendingUp,
  Shirt,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  ChevronRight,
  ArrowUpRight,
  DollarSign,
  UserCheck,
  Sparkles
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Tự động quét cập nhật trạng thái trễ hạn/đang thuê trước khi hiển thị dashboard
      await autoUpdateOrderStatus();
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Nếu chưa có sản phẩm nào, hiển thị nút nhắc nhở nạp dữ liệu chạy thử
  const isEmpty = stats && stats.totalProducts === 0;

  const cardStats = [
    {
      title: "Doanh thu hôm nay",
      value: formatVND(stats?.todayRevenue || 0),
      desc: "Tổng doanh thu thực nhận hôm nay",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Doanh thu tháng này",
      value: formatVND(stats?.monthRevenue || 0),
      desc: "Doanh thu thực tế tính từ đầu tháng",
      icon: TrendingUp,
      color: "bg-primary/5 text-primary border-brand-pink-pastel",
    },
    {
      title: "Đang cho thuê",
      value: `${stats?.rentingCount || 0} sản phẩm`,
      desc: "Váy cưới, đầm tiệc khách đang mặc",
      icon: Shirt,
      color: "bg-pink-50 text-pink-600 border-pink-100",
    },
    {
      title: "Sắp trả (3 ngày tới)",
      value: `${stats?.upcomingReturnCount || 0} đơn`,
      desc: "Đơn hàng cần chuẩn bị nhận lại",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Có sẵn tại shop",
      value: `${stats?.availableCount || 0} sản phẩm`,
      desc: "Sẵn sàng cho thuê ngay lập tức",
      icon: CheckCircle,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Tổng sản phẩm",
      value: `${stats?.totalProducts || 0} cái`,
      desc: "Tổng số lượng đầm/phụ kiện trong kho",
      icon: Calendar,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {isEmpty && (
        <div className="bg-brand-pink/50 border border-brand-pink-pastel rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-full bg-brand-pink-pastel flex items-center justify-center text-primary">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-semibold text-text-dark">Hệ thống chưa có dữ liệu</h3>
              <p className="text-xs text-text-muted">Bạn có muốn nạp dữ liệu demo chạy thử (sản phẩm, khách hàng, đơn thuê mẫu) để trải nghiệm giao diện nhanh hơn không?</p>
            </div>
          </div>
          <Link href="/settings" className="btn-primary flex-shrink-0">
            Đi tới Cài đặt & Tạo Demo
          </Link>
        </div>
      )}

      {/* Grid thống kê doanh thu / số lượng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardStats.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`glass-card p-6 border flex flex-col justify-between min-h-[140px]`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-text-muted tracking-wider uppercase">
                  {card.title}
                </span>
                <span className={`p-2.5 rounded-full border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-bold text-text-dark heading-serif">
                  {card.value}
                </h4>
                <p className="text-[11px] text-text-gray mt-1">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Widget chi tiết */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Cột Trái: Đơn quá hạn & Đơn sắp trả */}
        <div className="xl:col-span-2 space-y-8">
          {/* Đơn quá hạn (OVERDUE) */}
          <div className="glass-card p-6 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-brand-pink-pastel">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-text-dark heading-serif">Đơn thuê quá hạn</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                {stats?.overdueOrders?.length || 0} đơn trễ
              </span>
            </div>

            <div className="divide-y divide-brand-pink-pastel/50 flex-1 overflow-y-auto max-h-[250px] no-scrollbar">
              {stats?.overdueOrders && stats.overdueOrders.length > 0 ? (
                stats.overdueOrders.map((order: any) => (
                  <div key={order.id} className="py-4 flex items-center justify-between text-sm">
                    <div className="text-left">
                      <p className="font-semibold text-text-dark">{order.productName}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Mã: <span className="font-medium">{order.productCode}</span> | Khách: <span className="font-medium">{order.customerName}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-red-600">Trễ từ {order.endDate}</p>
                      <Link
                        href={`/orders?return=${order.id}`}
                        className="text-xs text-primary font-semibold hover:underline mt-1 inline-flex items-center gap-0.5"
                      >
                        Trả đồ <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-text-gray">
                  Không có đơn thuê nào bị quá hạn. Tuyệt vời!
                </div>
              )}
            </div>
          </div>

          {/* Đơn thuê sắp đến hạn */}
          <div className="glass-card p-6 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-brand-pink-pastel">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-text-dark heading-serif">Lịch trình sắp tới</h3>
              </div>
              <Link href="/orders" className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5">
                Xem tất cả <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-brand-pink-pastel/50 flex-1 overflow-y-auto max-h-[280px] no-scrollbar">
              {stats?.upcomingDueOrders && stats.upcomingDueOrders.length > 0 ? (
                stats.upcomingDueOrders.map((order: any) => (
                  <div key={order.id} className="py-4 flex items-center justify-between text-sm">
                    <div className="text-left">
                      <p className="font-semibold text-text-dark">{order.productName} ({order.productCode})</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Khách: <span className="font-medium">{order.customerName} ({order.customerPhone})</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-text-dark">
                        {order.startDate} → {order.endDate}
                      </p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1.5 ${
                        order.status === "RENTING" 
                          ? "bg-pink-100 text-primary" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {order.status === "RENTING" ? "Khách đang giữ" : "Đặt trước"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-text-gray">
                  Chưa có đơn hàng nào sắp tới.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cột Phải: Khách thuê / Đơn đặt gần đây */}
        <div className="space-y-8">
          <div className="glass-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 pb-4 border-b border-brand-pink-pastel">
              <UserCheck className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text-dark heading-serif">Đơn hàng mới tạo</h3>
            </div>

            <div className="divide-y divide-brand-pink-pastel/50 flex-1 overflow-y-auto max-h-[500px] no-scrollbar">
              {stats?.recentRents && stats.recentRents.length > 0 ? (
                stats.recentRents.map((order: any) => (
                  <div key={order.id} className="py-4 flex flex-col text-sm text-left">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-text-dark">{order.customerName}</span>
                      <span className="text-xs font-semibold text-primary">{formatVND(order.rentalFee)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1 text-xs text-text-muted">
                      <span>Thuê: {order.productCode} - {order.productName}</span>
                      <span>{order.startDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-text-gray">
                  Chưa có đơn hàng nào gần đây.
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-brand-pink-pastel mt-auto">
              <Link href="/orders" className="w-full py-2.5 bg-brand-pink hover:bg-brand-pink-pastel text-primary text-xs font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer">
                Tạo đơn thuê mới
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

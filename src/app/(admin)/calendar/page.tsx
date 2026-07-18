"use client";

import React, { useState, useEffect } from "react";
import { getProducts, ProductData } from "@/lib/services/products";
import { getOrders, OrderData, autoUpdateOrderStatus } from "@/lib/services/orders";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Info,
  Sparkles,
  Shirt,
  Clock
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Tiện ích ngày tháng
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  subDays
} from "date-fns";
import { vi } from "date-fns/locale";

type ViewMode = "month" | "week" | "day";

export default function CalendarPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Cấu hình thời gian hiển thị
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const fetchData = async () => {
    setLoading(true);
    try {
      await autoUpdateOrderStatus();
      const [pList, oList] = await Promise.all([getProducts(), getOrders()]);
      setProducts(pList);
      
      // Lọc các đơn thuê đang hoạt động để hiển thị lên lịch
      setOrders(oList.filter(o => o.status !== "RETURNED"));
    } catch (error) {
      toast.error("Không thể tải dữ liệu lịch thuê.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tính toán khoảng thời gian dựa theo chế độ xem
  const getTimelineDays = () => {
    if (viewMode === "month") {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return eachDayOfInterval({ start, end });
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Thứ 2
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    } else {
      return [currentDate];
    }
  };

  const timelineDays = getTimelineDays();

  // Chuyển hướng mốc thời gian
  const handlePrevTime = () => {
    if (viewMode === "month") setCurrentDate(prev => subMonths(prev, 1));
    else if (viewMode === "week") setCurrentDate(prev => subWeeks(prev, 1));
    else setCurrentDate(prev => subDays(prev, 1));
  };

  const handleNextTime = () => {
    if (viewMode === "month") setCurrentDate(prev => addMonths(prev, 1));
    else if (viewMode === "week") setCurrentDate(prev => addWeeks(prev, 1));
    else setCurrentDate(prev => addDays(prev, 1));
  };

  // Kiểm tra xem sản phẩm có đơn thuê vào ngày cụ thể không
  const getBookingForDate = (productId: string, day: Date) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    return orders.find(
      o => o.productId === productId && o.startDate <= formattedDay && o.endDate >= formattedDay
    );
  };

  // Format tiêu đề thời gian
  const getTimelineTitle = () => {
    if (viewMode === "month") {
      return format(currentDate, "MMMM 'năm' yyyy", { locale: vi });
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `Tuần: ${format(start, "dd/MM")} - ${format(end, "dd/MM/yyyy")}`;
    } else {
      return format(currentDate, "EEEE, 'ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Toaster position="top-right" />

      {/* Điều khiển Timeline */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-white p-4 rounded-2xl border border-brand-pink-pastel shadow-lux">
        
        {/* Toggle Chế độ xem */}
        <div className="flex gap-1.5 bg-brand-pink/35 p-1 rounded-full border border-brand-pink-pastel/60 w-full sm:w-auto">
          {(["month", "week", "day"] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === mode
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              {mode === "month" ? "Tháng" : mode === "week" ? "Tuần" : "Ngày"}
            </button>
          ))}
        </div>

        {/* Di chuyển thời gian */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrevTime}
            className="p-2 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="heading-serif font-bold text-base text-text-dark min-w-[160px] text-center capitalize flex items-center justify-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary" />
            {getTimelineTitle()}
          </h3>

          <button
            onClick={handleNextTime}
            className="p-2 border border-brand-pink-pastel text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : products.length > 0 ? (
        viewMode === "day" ? (
          // CHI TIẾT CHẾ ĐỘ XEM NGÀY (Hiển thị dạng list danh sách sản phẩm)
          <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden text-left">
            <div className="p-4 bg-brand-beige/25 border-b border-brand-pink-pastel flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-text-dark">Lịch thuê chi tiết trong ngày</h4>
            </div>
            
            <div className="divide-y divide-brand-pink-pastel/50">
              {products.map(product => {
                const booking = getBookingForDate(product.id!, currentDate);
                return (
                  <div key={product.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded bg-brand-pink/20 flex items-center justify-center text-primary font-bold">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-text-dark text-sm">{product.name}</h5>
                        <p className="text-xs text-text-gray">Mã: {product.code} | Size: {product.size} | Màu: {product.color}</p>
                      </div>
                    </div>

                    <div>
                      {booking ? (
                        <div className="bg-pink-50 border border-brand-pink-pastel/80 rounded-xl px-4 py-2 text-left">
                          <p className="text-xs font-semibold text-primary">Đang được đặt thuê</p>
                          <p className="text-[11px] text-text-dark mt-0.5">
                            Khách: <span className="font-bold">{booking.customerName} ({booking.customerPhone})</span>
                          </p>
                          <p className="text-[10px] text-text-gray">Thời gian: {booking.startDate} đến {booking.endDate}</p>
                        </div>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                          Sẵn sàng cho thuê (Trống lịch)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // CHẾ ĐỘ XEM THÁNG / TUẦN (Hiển thị biểu đồ Timeline ngang dạng Gantt)
          <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl shadow-lux overflow-hidden flex flex-col text-left">
            <div className="p-4 bg-brand-beige/25 border-b border-brand-pink-pastel flex items-center gap-1 text-xs text-text-gray font-medium">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>Mẹo: Kéo thanh cuộn sang phải để xem toàn bộ lịch trình. Ô màu hồng biểu thị sản phẩm đã được thuê.</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-brand-beige/10 border-b border-brand-pink-pastel">
                    {/* Header cột Sản phẩm */}
                    <th className="sticky left-0 bg-brand-white px-4 py-3 text-left border-r border-brand-pink-pastel text-xs font-bold text-text-dark w-44 md:w-56 shrink-0 z-10">
                      Sản phẩm
                    </th>
                    {/* Header các cột Ngày */}
                    {timelineDays.map(day => {
                      const isToday = isSameDay(day, new Date());
                      return (
                        <th
                          key={day.toString()}
                          className={`px-2 py-3 text-center border-r border-brand-pink-pastel/50 text-[10px] font-bold min-w-[36px] ${
                            isToday ? "bg-primary/10 text-primary" : "text-text-gray"
                          }`}
                        >
                          <p className="uppercase">{format(day, "eee", { locale: vi })}</p>
                          <p className="text-xs mt-0.5">{format(day, "d")}</p>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink-pastel/40">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-brand-beige/5">
                      {/* Tên sản phẩm cố định bên trái khi scroll */}
                      <td className="sticky left-0 bg-brand-white px-4 py-3 border-r border-brand-pink-pastel font-semibold text-text-dark text-xs truncate max-w-[176px] md:max-w-[224px] z-10 shadow-[2px_0_5px_-2px_rgba(219,39,119,0.08)]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-primary bg-brand-pink/40 px-1.5 py-0.5 rounded font-bold">
                            {product.code}
                          </span>
                          <span className="truncate" title={product.name}>{product.name}</span>
                        </div>
                      </td>

                      {/* Các ô ngày biểu diễn Gantt block */}
                      {timelineDays.map(day => {
                        const booking = getBookingForDate(product.id!, day);
                        const isToday = isSameDay(day, new Date());
                        
                        return (
                          <td
                            key={day.toString()}
                            className={`p-1 border-r border-brand-pink-pastel/40 text-center min-w-[36px] h-12 relative ${
                              isToday ? "bg-primary/5" : ""
                            }`}
                          >
                            {booking && (
                              // Thanh hiển thị dải màu khi có lịch thuê
                              <div 
                                className={`absolute inset-y-1 inset-x-0.5 rounded flex items-center justify-center text-[9px] font-bold transition-all duration-200 overflow-hidden shadow-sm ${
                                  booking.status === "OVERDUE"
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-primary text-white hover:bg-primary-hover"
                                }`}
                                title={`Khách: ${booking.customerName} (${booking.startDate} -> ${booking.endDate})`}
                              >
                                {/* Chỉ hiện tên khách ở ô ngày bắt đầu của họ hoặc nếu là ô đầu tiên của tuần để đỡ rối mắt */}
                                <span className="truncate px-0.5 select-none">
                                  {format(day, "yyyy-MM-dd") === booking.startDate ? booking.customerName.split(" ").pop() : "•"}
                                </span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="bg-brand-white border border-brand-pink-pastel rounded-2xl p-12 text-center shadow-lux">
          <CalendarIcon className="w-12 h-12 text-brand-pink-pastel mx-auto mb-4" />
          <p className="text-sm text-text-muted font-medium">Chưa có sản phẩm nào để hiển thị lịch trình.</p>
        </div>
      )}
    </div>
  );
}

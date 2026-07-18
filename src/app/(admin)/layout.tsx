"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Shirt,
  Calendar,
  FileText,
  Users,
  Image as ImageIcon,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Globe
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Đóng menu mobile khi đổi trang
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        <p className="text-text-muted font-medium text-sm">Đang tải hệ thống quản lý...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Tránh nhấp nháy giao diện khi đang redirect
  }

  const menuItems = [
    { name: "Tổng quan", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Sản phẩm", icon: Shirt, path: "/products" },
    { name: "Lịch thuê", icon: Calendar, path: "/calendar" },
    { name: "Đơn thuê", icon: FileText, path: "/orders" },
    { name: "Khách hàng", icon: Users, path: "/customers" },
    { name: "Album đồ", icon: ImageIcon, path: "/album" },
    { name: "Thu chi", icon: Wallet, path: "/finance" },
    { name: "Báo cáo", icon: BarChart3, path: "/reports" },
    { name: "Cài đặt", icon: Settings, path: "/settings" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  const getPageTitle = () => {
    const matched = menuItems.find(item => pathname === item.path || pathname.startsWith(item.path));
    return matched ? matched.name : "Hệ thống quản lý";
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-brand-white border-r border-brand-pink-pastel">
      {/* Brand Header */}
      <div className="p-6 border-b border-brand-pink-pastel flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-primary shadow-sm">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h1 className="heading-serif text-lg font-bold tracking-wide">Thuê Đồ Quýt Nhỏ</h1>
          <p className="text-[10px] text-text-muted tracking-widest uppercase">Admin Management</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-pink-200"
                  : "text-text-muted hover:bg-brand-pink hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-brand-pink-pastel bg-brand-beige/50 space-y-3">
        {/* Link xem website khách hàng */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-text-muted hover:bg-brand-pink hover:text-primary transition-all duration-200 cursor-pointer"
        >
          <Globe className="w-4 h-4" />
          <span>Xem website khách hàng</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-text-dark">Quản lý Shop</p>
              <p className="text-[10px] text-text-muted">Active</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-text-muted hover:text-primary hover:bg-brand-pink rounded-full transition-all duration-200 cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-white flex">
      {/* Sidebar cố định trên Desktop */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-20">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header di động & thanh điều khiển */}
        <header className="sticky top-0 bg-brand-white/80 backdrop-filter backdrop-blur-md border-b border-brand-pink-pastel px-4 lg:px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger Button cho Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="heading-serif text-xl font-bold">{getPageTitle()}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-beige border border-brand-pink-pastel text-text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Phú Quốc, Việt Nam
            </span>
          </div>
        </header>

        {/* Nội dung trang chi tiết */}
        <main className="flex-grow p-4 lg:p-8 bg-brand-beige/20">
          {children}
        </main>
      </div>

      {/* Sidebar dạng Drawer cho di động */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop mờ */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-64 max-w-xs h-full bg-brand-white shadow-xl animate-in slide-in-from-left duration-200">
            {/* Nút đóng */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-text-muted hover:bg-brand-pink rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Sparkles, KeyRound, User, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

/**
 * Chuyển đổi tên đăng nhập → email Firebase
 * Người dùng chỉ cần gõ "admin" — hệ thống tự xử lý phía sau
 */
function resolveEmail(username: string): string {
  const trimmed = username.trim().toLowerCase();
  // Nếu đã là email đầy đủ, dùng nguyên
  if (trimmed.includes("@")) return trimmed;
  // Ngược lại, ghép domain mặc định
  return `${trimmed}@doxinhphuquoc.vn`;
}

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Nếu đã đăng nhập, tự động chuyển vào dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const email = resolveEmail(username);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      } else {
        setError("Đã xảy ra lỗi đăng nhập. Chi tiết: " + err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Tạo tài khoản admin lần đầu thiết lập
  const handleCreateAdminAccount = async () => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await createUserWithEmailAndPassword(auth, "admin@doxinhphuquoc.vn", "admin123");
      setSuccess("✅ Tạo tài khoản thành công! Tên đăng nhập: admin | Mật khẩu: admin123");
      setUsername("admin");
      setPassword("admin123");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setSuccess("Tài khoản admin đã tồn tại. Hãy đăng nhập với tên: admin");
        setUsername("admin");
        setPassword("admin123");
      } else {
        setError("Không thể tạo tài khoản: " + err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-pink border-t-primary rounded-full animate-spin"></div>
        <p className="text-text-muted font-medium text-sm">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige/30 flex items-center justify-center p-4">
      {/* Nền trang trí */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-brand-pink/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-pink-pastel/50 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md glass-card p-8 text-center border border-brand-pink">
        {/* Logo */}
        <div className="mx-auto w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center text-primary shadow-md shadow-pink-100 mb-6">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="heading-serif text-3xl font-bold mb-2">Thuê Đồ Quýt Nhỏ</h1>
        <p className="text-text-muted text-sm mb-8 font-medium">Hệ thống quản lý cửa hàng cho thuê đồ</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 mb-6 flex items-start gap-2 text-left animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-3 mb-6 flex items-start gap-2 text-left animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          {/* Tên đăng nhập */}
          <div>
            <label className="block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider">
              Tên đăng nhập
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all duration-200"
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-xs font-semibold text-text-dark mb-2 uppercase tracking-wider">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 bg-brand-white border border-brand-pink-pastel rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-brand-pink-pastel transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer mt-8 disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Đang xử lý...
              </span>
            ) : "Đăng nhập hệ thống"}
          </button>
        </form>

      </div>
    </div>
  );
}

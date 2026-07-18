import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Be Vietnam Pro — Font thiết kế riêng cho tiếng Việt, hỗ trợ 100% Unicode Vietnamese
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thuê Đồ Quýt Nhỏ - Quản Lý Shop Thuê Đồ",
  description: "Hệ thống quản lý chuyên nghiệp cho thuê quần áo, váy, đầm và phụ kiện chụp ảnh tại Phú Quốc.",
  manifest: "/Shopthuedo/manifest.json?v=2",
  icons: {
    icon: "/Shopthuedo/Logo.png?v=2",
    apple: "/Shopthuedo/Logo.png?v=2",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thuê Đồ Quýt Nhỏ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full ${beVietnamPro.variable}`}>
      <body className={`h-full bg-brand-white text-text-dark flex flex-col ${beVietnamPro.className}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

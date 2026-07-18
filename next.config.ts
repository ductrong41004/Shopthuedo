import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Shopthuedo",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;

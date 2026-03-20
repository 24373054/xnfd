import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {},
  // 允许 Unsplash 图片域名走 next/image 优化
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // 现代格式优先
    formats: ["image/avif", "image/webp"],
  },
  // 压缩
  compress: true,
};

export default nextConfig;

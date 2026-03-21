import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "兴农法盾 · 武汉乡村农文旅法律服务平台",
  description: "立足武汉农文旅融合领域，为地理标志农产品合作社、乡村文旅小微主体、返乡创业者提供专业法律服务",
  keywords: "兴农法盾,武汉,乡村法律,地理标志,蔡甸莲藕,洪山菜薹,农文旅",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

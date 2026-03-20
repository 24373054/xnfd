"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#research", label: "调研实况" },
  { href: "/#services", label: "核心业务" },
  { href: "/#metrics", label: "服务数据" },
  { href: "/toolkit", label: "合规工具" },
  { href: "/#station", label: "驿站通道" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
        : "bg-transparent"
    )}>
      <div className="container-xl h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-green-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" />
            <div className="relative w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-white text-sm tracking-wide">兴农法盾</span>
            <span className="text-green-400/60 text-[10px] tracking-widest hidden sm:block">XINGNONG FADUN</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group",
                pathname === l.href
                  ? "text-green-400"
                  : "text-white/75 hover:text-white"
              )}
            >
              {l.label}
              <span className={cn(
                "absolute bottom-1 left-4 right-4 h-px bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                pathname === l.href && "scale-x-100"
              )} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/rights"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/75 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-all duration-200"
          >
            提交维权
          </Link>
          <Link
            href="/toolkit"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white btn-primary rounded-lg"
          >
            使用工具包
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-white/5 flex flex-col gap-2">
            <Link href="/rights" onClick={() => setOpen(false)} className="px-4 py-3 text-sm text-center text-white/60 border border-white/10 rounded-lg">提交维权</Link>
            <Link href="/toolkit" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-center text-white btn-primary rounded-lg">使用工具包</Link>
          </div>
        </div>
      )}
    </header>
  );
}

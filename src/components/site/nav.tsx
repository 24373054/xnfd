"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

const links = [
  { href: "/#research", label: "调研实况" },
  { href: "/#services", label: "核心业务" },
  { href: "/#metrics",  label: "服务数据" },
  { href: "/toolkit",   label: "合规工具" },
  { href: "/#station",  label: "驿站通道" },
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
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500")}
      style={scrolled ? { background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--glass-border)" } : { background: "transparent" }}
    >
      <div className="container-xl h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" style={{ background: "var(--accent-dark)" }} />
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-wide" style={{ color: "var(--text-primary)" }}>兴农法盾</span>
            <span className="text-[10px] tracking-widest hidden sm:block" style={{ color: "var(--accent)" }}>XINGNONG FADUN</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group"
              style={{ color: pathname === l.href ? "var(--accent)" : "var(--text-secondary)" }}
            >
              {l.label}
              <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: "var(--accent)", opacity: pathname === l.href ? 1 : undefined }} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link
            href="/rights"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--glass-border)" }}
          >
            提交维权
          </Link>
          <Link href="/toolkit" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white btn-primary rounded-lg">
            使用工具包
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-1" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--glass-border)" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium rounded-lg transition-all"
              style={{ color: "var(--text-secondary)" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 flex flex-col gap-2" style={{ borderTop: "1px solid var(--glass-border)" }}>
            <Link href="/rights" onClick={() => setOpen(false)} className="px-4 py-3 text-sm text-center rounded-lg glass" style={{ color: "var(--text-secondary)" }}>提交维权</Link>
            <Link href="/toolkit" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-center text-white btn-primary rounded-lg">使用工具包</Link>
          </div>
        </div>
      )}
    </header>
  );
}

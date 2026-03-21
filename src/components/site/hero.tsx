"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Circle, TrendingUp } from "lucide-react";

interface HeroProps {
  stats: {
    researchCount: number;
    caseCount: number;
    intentCount: number;
    applicationCount: number;
  };
}

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=60&auto=format&fit=crop",
];
const BG_IMAGES_2 = [
  "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=700&q=60&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=700&q=60&auto=format&fit=crop",
];

function ScrollingImageRow({ images, reverse = false, speed = 40 }: { images: string[]; reverse?: boolean; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2;
    const dir = reverse ? 1 : -1;
    const tick = () => {
      posRef.current += dir * (speed / 60);
      if (posRef.current <= -totalWidth) posRef.current += totalWidth;
      if (posRef.current >= 0) posRef.current -= totalWidth;
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reverse, speed]);

  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" className="h-36 w-56 object-cover rounded-lg shrink-0 opacity-75" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

const researchItems = [
  { status: "done",    area: "蔡甸莲藕合作社",   desc: "与3家合作社负责人深度访谈，梳理地标保护现状与痛点" },
  { status: "done",    area: "洪山菜薹种植户",   desc: "走访8户种植户，收集商标侵权、电商纠纷典型案例" },
  { status: "active",  area: "黄陂文旅经营者",   desc: "木兰乡村旅游带民宿、采摘园合规需求调研，已访谈14家" },
  { status: "pending", area: "新洲返乡创业者",   desc: "计划4月赴新洲涨渡湖黄颡鱼养殖区开展专项调研" },
];

export function HeroSection({ stats }: HeroProps) {
  const intentRate = stats.researchCount > 0
    ? Math.round((stats.intentCount / stats.researchCount) * 100)
    : 89;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Scrolling image background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 pt-16 space-y-3">
          <ScrollingImageRow images={BG_IMAGES} speed={35} />
          <ScrollingImageRow images={BG_IMAGES_2} reverse speed={28} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 pb-8 space-y-3">
          <ScrollingImageRow images={BG_IMAGES_2} speed={30} />
          <ScrollingImageRow images={BG_IMAGES} reverse speed={38} />
        </div>
        {/* 中间遮罩 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg-base) 55%, transparent), color-mix(in srgb, var(--bg-base) 80%, transparent), color-mix(in srgb, var(--bg-base) 55%, transparent))" }} />
        <div className="absolute inset-y-0 left-0 w-32" style={{ background: "linear-gradient(to right, var(--bg-base), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32" style={{ background: "linear-gradient(to left, var(--bg-base), transparent)" }} />
        <div className="absolute inset-0 opacity-20" style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }} />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float pointer-events-none opacity-20" style={{ background: "var(--accent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-float2 pointer-events-none opacity-10" style={{ background: "var(--accent-light)" }} />

      <div className="relative container-xl pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-green rounded-full text-xs font-semibold mb-8" style={{ color: "var(--accent-light)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-light)" }} />
              武汉乡村农文旅法律服务平台
              <span style={{ color: "var(--accent)" }}>·</span>
              <span style={{ color: "var(--accent)" }}>2026</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
              法治护航<br />
              <span className="shimmer-text">兴农助农</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-secondary)" }}>
              立足武汉农文旅融合领域，为蔡甸莲藕、洪山菜薹等地理标志产品合作社、乡村文旅小微主体、返乡创业者提供专业法律服务。
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/toolkit" className="group flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white btn-primary rounded-md">
                立即使用合规工具包
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#research" className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold glass rounded-md transition-all duration-200" style={{ color: "var(--text-secondary)" }}>
                查看调研报告
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { n: stats.researchCount || 47, unit: "家", label: "已走访调研主体" },
                { n: 3, unit: "个", label: "已对接地标合作社" },
                { n: 12, unit: "人", label: "核心团队成员" },
                { n: intentRate, unit: "%", label: "受访主体服务意向率" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 group card-hover">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>{s.n}</span>
                    <span className="font-bold" style={{ color: "var(--accent)" }}>{s.unit}</span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Research panel */}
          <div className="glass rounded-2xl overflow-hidden border-glow">
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--glass-border)" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>实地调研动态</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-light)" }} />
                <span className="text-xs" style={{ color: "var(--accent-light)" }}>实时更新</span>
              </div>
            </div>
            <div style={{ borderColor: "var(--glass-border)" }}>
              {researchItems.map((item, i) => (
                <div key={i} className="flex gap-4 px-6 py-5 transition-colors" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <div className="mt-0.5 shrink-0">
                    {item.status === "done"    && <CheckCircle className="w-4 h-4" style={{ color: "var(--accent-light)" }} />}
                    {item.status === "active"  && <Clock className="w-4 h-4 text-amber-400" />}
                    {item.status === "pending" && <Circle className="w-4 h-4" style={{ color: "var(--text-muted)" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.area}</span>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                        background: item.status === "done" ? "color-mix(in srgb, var(--accent) 15%, transparent)" : item.status === "active" ? "rgba(245,158,11,0.15)" : "color-mix(in srgb, var(--text-muted) 10%, transparent)",
                        color: item.status === "done" ? "var(--accent-light)" : item.status === "active" ? "#f59e0b" : "var(--text-muted)",
                      }}>
                        {item.status === "done" ? "已完成" : item.status === "active" ? "进行中" : "待启动"}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 flex items-center gap-2" style={{ borderTop: "1px solid var(--glass-border)" }}>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>89% 受访主体表达明确服务需求</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, var(--bg-base), transparent)" }} />
    </section>
  );
}

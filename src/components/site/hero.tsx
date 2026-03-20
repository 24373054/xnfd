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

// 背景图片：武汉农业/乡村/自然场景（每行6张足够无缝循环）
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

  // 复制两份实现无缝循环
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-36 w-56 object-cover rounded-lg shrink-0 opacity-55"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}


const researchItems = [
  { status: "done", area: "蔡甸莲藕合作社", desc: "与3家合作社负责人深度访谈，梳理地标保护现状与痛点" },
  { status: "done", area: "洪山菜薹种植户", desc: "走访8户种植户，收集商标侵权、电商纠纷典型案例" },
  { status: "active", area: "黄陂文旅经营者", desc: "木兰乡村旅游带民宿、采摘园合规需求调研，已访谈14家" },
  { status: "pending", area: "新洲返乡创业者", desc: "计划4月赴新洲涨渡湖黄颡鱼养殖区开展专项调研" },
];

export function HeroSection({ stats }: HeroProps) {
  const intentRate = stats.researchCount > 0
    ? Math.round((stats.intentCount / stats.researchCount) * 100)
    : 89;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050a05]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-green bg-grid opacity-100" />
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-float2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Scrolling image rows background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 顶部图片带 */}
        <div className="absolute top-0 left-0 right-0 pt-16 space-y-3">
          <ScrollingImageRow images={BG_IMAGES} speed={35} />
          <ScrollingImageRow images={BG_IMAGES_2} reverse speed={28} />
        </div>
        {/* 底部图片带 */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 space-y-3">
          <ScrollingImageRow images={BG_IMAGES_2} speed={30} />
          <ScrollingImageRow images={BG_IMAGES} reverse speed={38} />
        </div>
        {/* 中间遮罩：让文字区域清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a05]/60 via-[#050a05]/85 to-[#050a05]/60" />
        {/* 左右渐隐 */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050a05] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050a05] to-transparent" />
        {/* 绿色色调叠加 */}
        <div className="absolute inset-0 bg-green-950/30 mix-blend-multiply" />
      </div>

      <div className="relative container-xl pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-green rounded-full text-xs font-semibold text-green-400 mb-8">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              武汉乡村农文旅法律服务平台
              <span className="text-green-600">·</span>
              <span className="text-green-500">2026</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6">
              法治护航<br />
              <span className="shimmer-text">兴农助农</span>
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">
              立足武汉农文旅融合领域，为蔡甸莲藕、洪山菜薹等地理标志产品合作社、乡村文旅小微主体、返乡创业者提供专业法律服务。
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/toolkit"
                className="group flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white btn-primary rounded-md"
              >
                立即使用合规工具包
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#research"
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white/70 hover:text-white glass rounded-md transition-all duration-200 hover:border-white/20"
              >
                查看调研报告
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: stats.researchCount || 47, unit: "家", label: "已走访调研主体", icon: "📍" },
                { n: 3, unit: "个", label: "已对接地标合作社", icon: "🤝" },
                { n: 12, unit: "人", label: "核心团队成员", icon: "👥" },
                { n: intentRate, unit: "%", label: "受访主体服务意向率", icon: "📊" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 group hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-black text-white">{s.n}</span>
                    <span className="text-green-400 font-bold">{s.unit}</span>
                  </div>
                  <div className="text-white/55 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Research panel */}
          <div className="glass rounded-2xl overflow-hidden border-glow">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-white/30 uppercase tracking-widest">实地调研动态</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">实时更新</span>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {researchItems.map((item, i) => (
                <div key={i} className="flex gap-4 px-6 py-5 hover:bg-white/2 transition-colors">
                  <div className="mt-0.5 shrink-0">
                    {item.status === "done" && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {item.status === "active" && <Clock className="w-4 h-4 text-amber-400" />}
                    {item.status === "pending" && <Circle className="w-4 h-4 text-white/20" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold text-white/90">{item.area}</span>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "done" ? "bg-green-500/15 text-green-400" :
                        item.status === "active" ? "bg-amber-500/15 text-amber-400" :
                        "bg-white/5 text-white/30"
                      }`}>
                        {item.status === "done" ? "已完成" : item.status === "active" ? "进行中" : "待启动"}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-white/5 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-white/50">89% 受访主体表达明确服务需求</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a05] to-transparent pointer-events-none" />
    </section>
  );
}

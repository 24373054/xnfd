"use client";
import { useEffect, useRef } from "react";

interface MetricsProps {
  stats: {
    researchCount: number;
    caseCount: number;
    intentCount: number;
    applicationCount: number;
  };
}

const marqueeItems = [
  "蔡甸莲藕", "洪山菜薹", "黄陂文旅", "新洲创业者", "土地流转合规",
  "电商侵权维权", "合同风险自查", "地标品牌保护", "乡村安全合规", "公益诉讼",
];

function MetricsChart() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    let cleanup: (() => void) | undefined;

    // 直接读 data-theme 属性判断主题，避免 CSS 变量解析不准确
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    const isDark = theme === "dark";

    // 直接从 documentElement 读取 CSS 变量（颜色类变量可以直接读）
    const style = getComputedStyle(document.documentElement);
    const getVar = (name: string) => style.getPropertyValue(name).trim();

    const accent   = getVar("--accent")         || (isDark ? "#16a34a" : "#2563eb");
    const accentL  = getVar("--accent-light")   || (isDark ? "#22c55e" : "#3b82f6");
    const accentLL = getVar("--accent-lighter") || (isDark ? "#4ade80" : "#60a5fa");
    const accentD  = getVar("--accent-dark")    || (isDark ? "#14532d" : "#1e3a8a");

    const legendColor  = isDark ? "rgba(240,253,244,0.7)"  : "rgba(15,23,42,0.8)";
    const tooltipBg    = isDark ? "rgba(10,15,10,0.90)"    : "rgba(255,255,255,0.95)";
    const tooltipText  = isDark ? "#f0fdf4"                : "#0f172a";
    const emphasisColor = isDark ? "#f0fdf4"               : "#0f172a";
    const tooltipBorder = accent;

    Promise.all([
      import("echarts/core"),
      import("echarts/charts"),
      import("echarts/components"),
      import("echarts/renderers"),
    ]).then(([{ use, init }, { PieChart }, { TooltipComponent, LegendComponent }, { CanvasRenderer }]) => {
      use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);
      if (!ref.current) return;
      const chart = init(ref.current, undefined, { renderer: "canvas" });
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}份 ({d}%)",
          backgroundColor: tooltipBg,
          borderColor: tooltipBorder,
          textStyle: { color: tooltipText },
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: "center",
          textStyle: { color: legendColor, fontSize: 11 },
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
        },
        series: [{
          name: "需求类型",
          type: "pie",
          radius: ["50%", "75%"],
          center: ["65%", "50%"],
          itemStyle: { borderRadius: 8, borderWidth: 0 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 13, fontWeight: "bold", color: emphasisColor },
            itemStyle: { shadowBlur: 20, shadowColor: accent },
          },
          data: [
            { value: 61, name: "合同模板需求", itemStyle: { color: accent } },
            { value: 48, name: "侵权投诉协助", itemStyle: { color: accentL } },
            { value: 42, name: "安全合规指导", itemStyle: { color: accentLL } },
            { value: 29, name: "法律咨询",     itemStyle: { color: accentD } },
            { value: 18, name: "其他",         itemStyle: { color: "rgba(150,150,150,0.5)" } },
          ],
        }],
      });
      const ro = new ResizeObserver(() => chart.resize());
      ro.observe(ref.current!);
      cleanup = () => { chart.dispose(); ro.disconnect(); };
    });

    return () => cleanup?.();
  }, []);

  return <div ref={ref} className="w-full h-full" />;
}

export function MetricsSection({ stats }: MetricsProps) {
  const kpis: { n: number; unit: string; label: string; sub: string; href?: string }[] = [
    { n: stats.researchCount || 47, unit: "家", label: "已走访调研主体",  sub: "覆盖蔡甸、洪山、黄陂三区" },
    { n: 89, unit: "份", label: "有效调研问卷", sub: "89%表达明确服务需求", href: "https://v.wjx.cn/vm/YZrWCYf.aspx" },
    { n: 3,  unit: "家", label: "已签意向合作社", sub: "蔡甸莲藕2家、洪山菜薹协会1家" },
    { n: stats.caseCount || 11, unit: "件", label: "收集典型案例", sub: "地标侵权7件、合同纠纷3件" },
  ];

  return (
    <section id="metrics" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Marquee strip */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-3" style={{ borderBottom: "1px solid var(--glass-border)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              {item}
              <span className="w-1 h-1 rounded-full" style={{ background: "color-mix(in srgb, var(--accent) 40%, transparent)" }} />
            </span>
          ))}
        </div>
      </div>

      <div className="relative container-xl pt-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>服务数据</span>
            </div>
            <h2 className="text-5xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              用数字<br />
              <span className="text-gradient">说话</span>
            </h2>
          </div>
          <div className="glass rounded-xl p-4 max-w-sm">
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>数据说明：</span>
              当前处于项目启动阶段，部分数据为调研阶段成果。我们选择如实呈现，而非虚报数字。随着服务推进，数据将持续更新。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((k) => {
              const inner = (
                <>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black" style={{ color: "var(--text-primary)" }}>{k.n}</span>
                    <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>{k.unit}</span>
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{k.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{k.sub}</div>
                  {k.href && (
                    <div className="mt-2 text-[11px] transition-colors" style={{ color: "var(--accent)" }}>
                      点击查看问卷 →
                    </div>
                  )}
                  <div className="mt-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--accent) 30%, transparent), transparent)" }} />
                </>
              );
              return k.href ? (
                <a key={k.label} href={k.href} target="_blank" rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 card-hover group block transition-colors"
                  style={{ border: "1px solid color-mix(in srgb, var(--accent) 15%, transparent)" }}>
                  {inner}
                </a>
              ) : (
                <div key={k.label} className="glass rounded-2xl p-6 card-hover group">{inner}</div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="glass rounded-2xl overflow-hidden h-72 relative">
            {/* 背景图 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--bg-base) 50%, transparent), color-mix(in srgb, var(--bg-base) 20%, transparent))" }} />
            <div className="relative p-6 h-full flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>调研需求分布</p>
              <div className="flex-1">
                <MetricsChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

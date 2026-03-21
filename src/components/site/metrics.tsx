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

    Promise.all([
      import("echarts/core"),
      import("echarts/charts"),
      import("echarts/components"),
      import("echarts/renderers"),
    ]).then(([{ use, init }, { PieChart }, { TooltipComponent, LegendComponent }, { CanvasRenderer }]) => {
      use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);
      if (!ref.current) return;
      const chart = init(ref.current, "dark");
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}份 ({d}%)",
          backgroundColor: "rgba(0,0,0,0.8)",
          borderColor: "rgba(22,163,74,0.3)",
          textStyle: { color: "#fff" },
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: "center",
          textStyle: { color: "rgba(255,255,255,0.5)", fontSize: 11 },
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
        },
        series: [{
          name: "需求类型",
          type: "pie",
          radius: ["50%", "75%"],
          center: ["65%", "50%"],
          itemStyle: { borderRadius: 8, borderColor: "rgba(5,10,5,0.8)", borderWidth: 3 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 13, fontWeight: "bold", color: "#fff" },
            itemStyle: { shadowBlur: 20, shadowColor: "rgba(22,163,74,0.5)" },
          },
          data: [
            { value: 61, name: "合同模板需求", itemStyle: { color: "#16a34a" } },
            { value: 48, name: "侵权投诉协助", itemStyle: { color: "#22c55e" } },
            { value: 42, name: "安全合规指导", itemStyle: { color: "#4ade80" } },
            { value: 29, name: "法律咨询",     itemStyle: { color: "#86efac" } },
            { value: 18, name: "其他",         itemStyle: { color: "#166534" } },
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
    { n: stats.researchCount || 47, unit: "家", label: "已走访调研主体", sub: "覆盖蔡甸、洪山、黄陂三区" },
    { n: 89, unit: "份", label: "有效调研问卷", sub: "89%表达明确服务需求", href: "https://v.wjx.cn/vm/YZrWCYf.aspx" },
    { n: 3, unit: "家", label: "已签意向合作社", sub: "蔡甸莲藕2家、洪山菜薹协会1家" },
    { n: stats.caseCount || 11, unit: "件", label: "收集典型案例", sub: "地标侵权7件、合同纠纷3件" },
  ];

  return (
    <section id="metrics" className="section-pad bg-[#050a05] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-30" />

      {/* Marquee strip */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-3 border-b border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-semibold text-white/40 uppercase tracking-widest">
              {item}
              <span className="w-1 h-1 bg-green-500/40 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative container-xl pt-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-green-500" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest">服务数据</span>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tight">
              用数字<br />
              <span className="text-gradient">说话</span>
            </h2>
          </div>
          <div className="glass rounded-xl p-4 max-w-sm">
            <p className="text-xs text-white/50 leading-relaxed">
              <span className="text-white/75 font-semibold">数据说明：</span>
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
                    <span className="text-4xl font-black text-white">{k.n}</span>
                    <span className="text-green-400 text-lg font-bold">{k.unit}</span>
                  </div>
                  <div className="text-sm font-semibold text-white/80 mb-1">{k.label}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{k.sub}</div>
                  {k.href && (
                    <div className="mt-2 text-[11px] text-green-400/70 group-hover:text-green-400 transition-colors">
                      点击查看问卷 →
                    </div>
                  )}
                  <div className="mt-4 h-px bg-gradient-to-r from-green-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </>
              );
              return k.href ? (
                <a
                  key={k.label}
                  href={k.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 card-hover group block border border-green-500/10 hover:border-green-500/30 transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <div key={k.label} className="glass rounded-2xl p-6 card-hover group">
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="glass rounded-2xl p-6 h-72">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">调研需求分布</p>
            <MetricsChart />
          </div>
        </div>
      </div>
    </section>
  );
}

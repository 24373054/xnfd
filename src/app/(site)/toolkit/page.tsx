import { Metadata } from "next";
import { ToolkitClient } from "./toolkit-client";

export const metadata: Metadata = {
  title: "合规工具包 · 兴农法盾",
  description: "专为乡村小微主体打造的法律风险自检工具包，覆盖合同起草、风险自查、地标合规全流程",
};

export default function ToolkitPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-grid-green bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "color-mix(in srgb, var(--accent) 5%, transparent)" }} />

      <div className="relative container-xl">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>合规工具包</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            法律风险<br />
            <span className="text-gradient">自检工具包 1.0</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            专为乡村小微主体打造，无需专业法律知识，覆盖合同起草、风险自查、地标合规全流程。
          </p>
        </div>
        <ToolkitClient />
      </div>
    </div>
  );
}

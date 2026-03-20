import { Metadata } from "next";
import { ToolkitClient } from "./toolkit-client";

export const metadata: Metadata = {
  title: "合规工具包 · 兴农法盾",
  description: "专为乡村小微主体打造的法律风险自检工具包，覆盖合同起草、风险自查、地标合规全流程",
};

export default function ToolkitPage() {
  return (
    <div className="min-h-screen bg-[#050a05] pt-24 pb-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-green bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-xl">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-green-500" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">合规工具包</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4">
            法律风险<br />
            <span className="text-gradient">自检工具包 1.0</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            专为乡村小微主体打造，无需专业法律知识，覆盖合同起草、风险自查、地标合规全流程。
          </p>
        </div>
        <ToolkitClient />
      </div>
    </div>
  );
}

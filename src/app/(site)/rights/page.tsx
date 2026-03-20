import { Metadata } from "next";
import { RightsForm } from "./rights-form";
import { Shield, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "提交维权申请 · 兴农法盾",
};

export default function RightsPage() {
  return (
    <div className="min-h-screen bg-[#050a05] pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-green bg-grid opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-green-500" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest">维权绿色通道</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight mb-5">
              提交<br />
              <span className="text-gradient">维权申请</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              1个工作日内专人响应，请如实填写以便我们快速处理。
            </p>

            <div className="space-y-4">
              {[
                { icon: Clock, title: "1个工作日响应", desc: "提交后专人跟进，不让您等待" },
                { icon: Shield, title: "免费法律咨询", desc: "初步评估案情，提供处理建议" },
                { icon: Phone, title: "全程陪同协助", desc: "从证据收集到投诉全程支持" },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 glass rounded-xl">
                  <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">{item.title}</div>
                    <div className="text-xs text-white/40">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <RightsForm />
          </div>
        </div>
      </div>
    </div>
  );
}

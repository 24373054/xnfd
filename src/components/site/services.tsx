import Image from "next/image";
import Link from "next/link";
import { Shield, FileCheck, Scale, ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01", icon: Shield, title: "地标品牌法治护航",
    desc: "协助蔡甸莲藕、洪山菜薹等地标产品合作社建立品牌保护档案，监测线上侵权线索，提供侵权投诉指引，对接市场监管部门快速响应。",
    href: "/toolkit", cta: "使用自检工具",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    tags: ["商标保护", "侵权监测", "快速响应"],
  },
  {
    n: "02", icon: FileCheck, title: "乡村合规自检服务",
    desc: "在线审查土地流转、用工、购销合同，一键生成合规文书。针对民宿、采摘园等文旅项目开展安全责任、消保专项指导。",
    href: "/toolkit", cta: "使用自检工具",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    tags: ["合同审查", "合规文书", "风险自查"],
  },
  {
    n: "03", icon: Scale, title: "维权绿色通道",
    desc: "对接市场监管、农业农村部门，快速响应侵权投诉。协助农户低成本收集维权证据，重大案件推动公益诉讼形成司法示范。",
    href: "/rights", cta: "申请维权协助",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9",
    tags: ["维权协助", "证据收集", "公益诉讼"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-section-a)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)" }} />
      <div className="relative container-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>核心业务</span>
            </div>
            <h2 className="text-5xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              三大服务<br /><span className="text-gradient">模块</span>
            </h2>
          </div>
          <p className="text-base max-w-sm leading-relaxed lg:text-right" style={{ color: "var(--text-secondary)" }}>
            聚焦乡村农文旅真实痛点，在团队能力范围内提供切实可用的法律服务。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.n} href={s.href} className="group relative glass rounded-2xl overflow-hidden card-hover block">
                <div className="absolute inset-0">
                  <Image src={s.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom right, color-mix(in srgb, var(--bg-base) 90%, transparent), color-mix(in srgb, var(--bg-base) 60%, transparent), transparent)" }} />
                </div>
                <div className="relative p-7">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)" }}>
                      <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                    </div>
                    <span className="text-5xl font-black leading-none" style={{ color: "color-mix(in srgb, var(--text-primary) 10%, transparent)" }}>{s.n}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-semibold rounded-full" style={{ color: "var(--accent-light)", background: "color-mix(in srgb, var(--accent) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                    {s.cta}<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

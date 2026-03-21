import Image from "next/image";
import Link from "next/link";
import { Shield, FileCheck, Scale, ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    icon: Shield,
    title: "地标品牌法治护航",
    desc: "协助蔡甸莲藕、洪山菜薹等地标产品合作社建立品牌保护档案，监测线上侵权线索，提供侵权投诉指引，对接市场监管部门快速响应。",
    href: "/toolkit",
    cta: "使用自检工具",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    tags: ["商标保护", "侵权监测", "快速响应"],
  },
  {
    n: "02",
    icon: FileCheck,
    title: "乡村合规自检服务",
    desc: "在线审查土地流转、用工、购销合同，一键生成合规文书。针对民宿、采摘园等文旅项目开展安全责任、消保专项指导。",
    href: "/toolkit",
    cta: "使用自检工具",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    tags: ["合同审查", "合规文书", "风险自查"],
  },
  {
    n: "03",
    icon: Scale,
    title: "维权绿色通道",
    desc: "对接市场监管、农业农村部门，快速响应侵权投诉。协助农户低成本收集维权证据，重大案件推动公益诉讼形成司法示范。",
    href: "/rights",
    cta: "申请维权协助",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9",
    tags: ["维权协助", "证据收集", "公益诉讼"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-pad bg-[#080d08] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-green bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="relative container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-green-500" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest">核心业务</span>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tight">
              四大服务<br />
              <span className="text-gradient">模块</span>
            </h2>
          </div>
          <p className="text-white/60 text-base max-w-sm leading-relaxed lg:text-right">
            聚焦乡村农文旅真实痛点，在团队能力范围内提供切实可用的法律服务。
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.n}
                href={s.href}
                className="group relative glass rounded-2xl overflow-hidden card-hover block"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d140d] via-[#0d140d]/80 to-transparent" />
                </div>

                <div className="relative p-7">
                  {/* Number + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-white/10 text-5xl font-black leading-none group-hover:text-white/20 transition-colors">{s.n}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{s.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-semibold text-green-300/80 bg-green-500/15 rounded-full border border-green-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                    {s.cta}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

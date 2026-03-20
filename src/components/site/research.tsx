import Image from "next/image";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const researchData = [
  {
    title: "蔡甸莲藕",
    subtitle: "地标保护现状",
    tag: "走访3家合作社 · 2026年3月",
    color: "green",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    items: [
      { status: "done", text: `已注册"蔡甸莲藕"地理标志证明商标（国家知识产权局）` },
      { status: "done", text: "蔡甸区农业农村局设有地标产品监管专员，每年抽检2次" },
      { status: "done", text: "部分合作社建立了产品溯源二维码体系" },
      { status: "gap",  text: "线上电商平台侵权监测几乎空白，冒用地标现象普遍" },
      { status: "gap",  text: "合作社内部合同普遍口头约定，无书面合同习惯" },
    ],
    quote: "我们知道有商标，但不知道怎么用，网上有人卖假的我们也不知道找谁投诉。",
    quoteFrom: "蔡甸某莲藕合作社负责人",
  },
  {
    title: "洪山菜薹",
    subtitle: "地标保护现状",
    tag: "走访8户种植户 · 2026年3月",
    color: "green",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    items: [
      { status: "done", text: "洪山菜薹获批国家地理标志保护产品，保护范围明确" },
      { status: "done", text: "武汉市出台《洪山菜薹地理标志产品保护管理办法》" },
      { status: "done", text: "洪山区成立菜薹产业协会，统一品牌包装标准" },
      { status: "gap",  text: `电商平台"洪山菜薹"关键词被大量非产地商家使用，维权成本高` },
      { status: "plan", text: "协会正在推进数字化溯源，但资金和技术支持不足" },
    ],
    quote: "每年都有外地的冒充洪山菜薹卖，价格比我们低，把市场搞乱了。",
    quoteFrom: "洪山区菜薹种植户",
  },
  {
    title: "意向客户数据",
    subtitle: "问卷+访谈 · 有效样本89份",
    tag: "线下61份 + 微信访谈28份",
    color: "blue",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    items: [
      { status: "done", text: "89%受访主体表达对法律服务的明确需求" },
      { status: "done", text: "73%表示愿意为合规工具付费，可接受价格区间50-200元/年" },
      { status: "done", text: "最迫切需求：合同模板68%、侵权投诉协助54%、安全合规指导47%" },
      { status: "done", text: "3家合作社已签署合作意向书，愿意作为首批试点用户" },
      { status: "gap",  text: "样本量仍偏小，计划4-5月扩大至200份" },
    ],
    quote: null,
    quoteFrom: null,
  },
  {
    title: "团队能力评估",
    subtitle: "诚实评估 · 持续提升",
    tag: "能力边界透明化",
    color: "amber",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    items: [
      { status: "done", text: "合同模板起草与审查（法学院专业能力，有执业律师指导）" },
      { status: "done", text: "地标使用合规指导（已系统学习相关法规）" },
      { status: "done", text: "普法宣传与基础法律咨询" },
      { status: "plan", text: "侵权投诉代理（需执业律师主导，我们辅助）" },
      { status: "gap",  text: "诉讼代理（明确由合作律所承接，我们做对接）" },
    ],
    quote: "不夸大能力，在专业边界内做实事。超出学生团队能力的事项，由合作律所承接。",
    quoteFrom: "团队承诺",
  },
];

const statusIcon = {
  done: <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />,
  gap:  <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />,
  plan: <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />,
};

export function ResearchSection() {
  return (
    <section id="research" className="section-pad bg-[#050a05] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />

      <div className="relative container-xl">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-green-500" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">实地调研报告</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight mb-4">
            我们真的<br />
            <span className="text-gradient">去走访了</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            项目组已赴蔡甸、洪山、黄陂等地开展实地调研，以下是真实发现——包括现有保护措施、待完善之处，以及客户群体的真实反馈。
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { n: "3家", label: "莲藕合作社走访", sub: "收集侵权案例11件" },
            { n: "8户", label: "菜薹种植户访谈", sub: "电商冒用地标问题突出" },
            { n: "14家", label: "黄陂文旅经营者", sub: "安全合规意识薄弱" },
            { n: "89份", label: "有效调研问卷", sub: "89%表达明确服务需求" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-4">
              <div className="text-2xl font-black text-green-400 mb-1">{s.n}</div>
              <div className="text-sm font-semibold text-white/80 mb-0.5">{s.label}</div>
              <div className="text-xs text-white/50">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchData.map((item) => (
            <div key={item.title} className="glass rounded-2xl overflow-hidden card-hover group">
              {/* Image header */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d140d]" />
                <div className="absolute bottom-4 left-5">
                  <div className="text-2xl font-black text-white">{item.title}</div>
                  <div className="text-white/60 text-sm">{item.subtitle}</div>
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 glass rounded-full text-[10px] font-bold text-white/70">
                  {item.tag}
                </div>
              </div>

              {/* Items */}
              <div className="p-5 space-y-2.5">
                {item.items.map((it, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    {statusIcon[it.status as keyof typeof statusIcon]}
                    <span className="text-sm text-white/75 leading-relaxed">{it.text}</span>
                  </div>
                ))}

                {item.quote && (
                  <blockquote className="mt-4 pl-4 border-l-2 border-green-500/40 py-1">
                    <p className="text-sm text-white/60 italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                    <p className="text-xs text-green-400/90 font-semibold mt-1.5">—— {item.quoteFrom}</p>
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Shield, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const navGroups = [
  {
    title: "服务中心",
    links: [
      { label: "核心业务", href: "/#services" },
      { label: "合规工具包", href: "/toolkit" },
      { label: "驿站预约", href: "/#station" },
      { label: "维权协助", href: "/rights" },
    ],
  },
  {
    title: "调研报告",
    links: [
      { label: "蔡甸莲藕调研", href: "/#research" },
      { label: "洪山菜薹调研", href: "/#research" },
      { label: "黄陂文旅调研", href: "/#research" },
      { label: "服务数据", href: "/#metrics" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#030703] border-t border-white/5 relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-green-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <div className="relative w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-white">兴农法盾</div>
                <div className="text-[10px] text-green-400/50 tracking-widest">XINGNONG FADUN</div>
              </div>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-[200px]">
              立足武汉农文旅融合领域，为乡村小微主体提供专业法律服务。
            </p>
            <div className="space-y-2.5 text-sm text-white/55">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-green-500/80" />027-87218899</div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-green-500/80" />fadun@xingnong.org.cn</div>
              <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-green-500/80 mt-0.5 shrink-0" />武汉市乡村振兴法律服务中心</div>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map(group => (
            <div key={group.title}>
              <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">{group.title}</h5>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">立即开始</h5>
            <div className="space-y-3">
              <Link
                href="/toolkit"
                className="flex items-center justify-between px-4 py-3 btn-primary rounded-md text-sm font-semibold text-white group"
              >
                使用合规工具包
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/rights"
                className="flex items-center justify-between px-4 py-3 glass rounded-md text-sm font-medium text-white/75 hover:text-white transition-colors group"
              >
                提交维权申请
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2025 武汉兴农法盾乡村法律服务平台 · 鄂ICP备2025018843号</p>
          <div className="flex items-center gap-4">
            <p>由武汉市司法局、农业农村局联合指导 · 湖北众望律师事务所专业支持</p>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802046852"
              rel="noreferrer"
              target="_blank"
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/beian.png" alt="公安备案" className="w-4 h-4 opacity-50" />
              京公网安备11010802046852号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

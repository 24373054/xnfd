import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Calendar, ArrowRight, Zap } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StationEvent {
  id: string;
  title: string;
  area: string;
  address: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string | null;
}

const stationAreas = [
  { name: "黄陂区", desc: "木兰乡村旅游带", active: true },
  { name: "新洲区", desc: "采摘园集聚区", active: true },
  { name: "蔡甸区", desc: "莲藕产业带", active: true },
  { name: "汉南区", desc: "甜玉米种植区", active: false },
];

export function StationSection({ events }: { events: StationEvent[] }) {
  return (
    <section id="station" className="section-pad bg-[#080d08] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d08] via-transparent to-[#080d08]" />
      </div>

      <div className="relative container-xl">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-green-500" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">线下服务</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight mb-4">
            流动驿站<br />
            <span className="text-gradient">+ 维权通道</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            线上工具 + 线下驻点，打造全流程法律服务体系，让农户不出村就能获得专业帮助。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Station card */}
          <div className="glass rounded-2xl overflow-hidden card-hover group">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                alt="流动驿站"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d140d]" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">流动法治驿站</div>
                  <div className="text-xs text-white/60">每周六、周日 9:00–17:00</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-white/65 leading-relaxed">
                联合武汉高校法学院、司法局共建，在武汉乡村旅游热点区域定期驻点，为农户、小微主体提供面对面免费法律服务。
              </p>

              {/* Area tags */}
              <div className="flex flex-wrap gap-2">
                {stationAreas.map(area => (
                  <div key={area.name} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    area.active
                      ? "bg-green-500/15 border border-green-500/30 text-green-300"
                      : "bg-white/8 border border-white/10 text-white/50"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${area.active ? "bg-green-400" : "bg-white/20"}`} />
                    {area.name} · {area.desc}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Phone className="w-3.5 h-3.5 text-green-500" />
                  驿站预约咨询：027-87218899
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Calendar className="w-3.5 h-3.5 text-green-500" />
                  下次驻点：黄陂木兰景区，4月5日（周六）
                </div>
              </div>
            </div>
          </div>

          {/* Rights card */}
          <div className="glass rounded-2xl overflow-hidden card-hover group">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9"
                alt="维权通道"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d140d]" />
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">维权绿色通道</div>
                  <div className="text-xs text-white/60">1个工作日内专人响应</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-white/65 leading-relaxed">
                与武汉市市场监管局、农业农村局、文旅局建立联动机制，快速处理地理标志冒用、合同纠纷、消费维权等问题。
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "公益诉讼", desc: "大规模地标侵权" },
                  { label: "证据协助", desc: "免费固证教程" },
                  { label: "快速响应", desc: "1工作日内回复" },
                  { label: "部门联动", desc: "市监局直通" },
                ].map(item => (
                  <div key={item.label} className="bg-white/6 rounded-lg p-3">
                    <div className="text-xs font-bold text-green-300 mb-0.5">{item.label}</div>
                    <div className="text-xs text-white/55">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Phone className="w-3.5 h-3.5 text-green-500" />
                  侵权投诉热线：027-87219988
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Mail className="w-3.5 h-3.5 text-green-500" />
                  fadun@xingnong.org.cn
                </div>
              </div>

              <Link
                href="/rights"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white btn-primary rounded-md"
              >
                提交维权申请
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        {events.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-5">近期驿站活动</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {events.map((e) => (
                <div key={e.id} className="glass rounded-xl p-5 card-hover">
                  <div className="text-xs font-bold text-green-400 mb-2">{e.area}</div>
                  <div className="font-semibold text-white mb-3">{e.title}</div>
                  <div className="space-y-1.5 text-xs text-white/60">
                    <div className="flex items-center gap-2"><Calendar className="w-3 h-3" />{formatDate(e.date)}</div>
                    <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{e.startTime}–{e.endTime}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{e.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

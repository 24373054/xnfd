import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Scale, MapPin } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { STATUS_MAP } from "@/lib/constants";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [researchCount, caseCount, applicationCount, recentApplications, recentCases] = await Promise.all([
    db.researchRecord.count(),
    db.serviceCase.count(),
    db.rightsApplication.count(),
    db.rightsApplication.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.serviceCase.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const kpis = [
    { label: "调研记录", value: researchCount, icon: Users, color: "text-blue-600 bg-blue-100" },
    { label: "服务案例", value: caseCount, icon: FileText, color: "text-green-600 bg-green-100" },
    { label: "维权申请", value: applicationCount, icon: Scale, color: "text-amber-600 bg-amber-100" },
    { label: "驿站活动", value: 0, icon: MapPin, color: "text-purple-600 bg-purple-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">控制台</h1>
        <p className="text-slate-500 text-sm mt-1">欢迎回来，{session.user?.name}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{k.value}</div>
                  <div className="text-xs text-slate-500">{k.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">最新维权申请</CardTitle></CardHeader>
          <CardContent className="p-0">
            {recentApplications.length === 0 ? (
              <p className="text-sm text-slate-400 px-6 pb-4">暂无申请</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentApplications.map((a) => {
                  const s = STATUS_MAP[a.status as keyof typeof STATUS_MAP];
                  return (
                    <div key={a.id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{a.name} · {a.area}</div>
                        <div className="text-xs text-slate-400">{a.type} · {formatDateTime(a.createdAt)}</div>
                      </div>
                      <Badge variant={s?.color as "amber" | "blue" | "default"}>{s?.label}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">最新服务案例</CardTitle></CardHeader>
          <CardContent className="p-0">
            {recentCases.length === 0 ? (
              <p className="text-sm text-slate-400 px-6 pb-4">暂无案例</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentCases.map((c) => {
                  const s = STATUS_MAP[c.status as keyof typeof STATUS_MAP];
                  return (
                    <div key={c.id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{c.title}</div>
                        <div className="text-xs text-slate-400">{c.type} · {c.area}</div>
                      </div>
                      <Badge variant={s?.color as "amber" | "blue" | "default"}>{s?.label}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

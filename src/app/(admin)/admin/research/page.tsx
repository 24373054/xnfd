import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ResearchForm } from "./research-form";

export default async function AdminResearchPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const records = await db.researchRecord.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">调研记录</h1>
          <p className="text-slate-500 text-sm mt-1">共 {records.length} 条记录</p>
        </div>
        <ResearchForm />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {records.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">暂无调研记录</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">受访主体</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">区域</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">类型</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">走访日期</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">服务意向</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">发现问题</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => {
                let issues: string[] = [];
                try { issues = JSON.parse(r.issues); } catch { issues = [r.issues]; }
                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-slate-900">{r.subject}</div>
                      {r.contact && <div className="text-xs text-slate-400">{r.contact}</div>}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{r.area}</td>
                    <td className="px-5 py-3.5 text-slate-600">{r.type}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{formatDate(r.date)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        r.hasIntent ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {r.hasIntent ? "有意向" : "暂无"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {issues.map((issue, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-red-50 text-red-600 text-xs rounded">{issue}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

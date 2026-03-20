import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { STATUS_MAP } from "@/lib/constants";
import { CaseForm } from "./case-form";
import { CaseActions } from "./case-actions";

export default async function AdminCasesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const cases = await db.serviceCase.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">服务案例</h1>
          <p className="text-slate-500 text-sm mt-1">共 {cases.length} 条案例</p>
        </div>
        <CaseForm />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {cases.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">暂无服务案例</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">案例标题</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">类型</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">区域</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">状态</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">前台展示</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">创建时间</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map((c) => {
                const s = STATUS_MAP[c.status as keyof typeof STATUS_MAP];
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900 max-w-[200px] truncate">{c.title}</td>
                    <td className="px-5 py-3.5 text-slate-600">{c.type}</td>
                    <td className="px-5 py-3.5 text-slate-600">{c.area}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        c.status === "pending" ? "bg-amber-100 text-amber-700" :
                        c.status === "processing" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {s?.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold ${c.isPublic ? "text-green-600" : "text-slate-400"}`}>
                        {c.isPublic ? "展示中" : "未展示"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{formatDateTime(c.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <CaseActions id={c.id} status={c.status} isPublic={c.isPublic} description={c.description} result={c.result} />
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

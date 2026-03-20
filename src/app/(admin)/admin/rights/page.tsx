import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { STATUS_MAP } from "@/lib/constants";
import { RightsActions } from "./rights-actions";

export default async function AdminRightsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const applications = await db.rightsApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">维权申请</h1>
        <p className="text-slate-500 text-sm mt-1">共 {applications.length} 条申请</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {applications.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">暂无维权申请</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">申请人</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">区域</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">类型</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">状态</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">提交时间</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((a) => {
                const s = STATUS_MAP[a.status as keyof typeof STATUS_MAP];
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-slate-900">{a.name}</div>
                      <div className="text-xs text-slate-400">{a.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{a.area}</td>
                    <td className="px-5 py-3.5 text-slate-600">{a.type}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        a.status === "pending" ? "bg-amber-100 text-amber-700" :
                        a.status === "processing" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {s?.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{formatDateTime(a.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <RightsActions id={a.id} status={a.status} description={a.description} evidence={a.evidence} adminNote={a.adminNote} />
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

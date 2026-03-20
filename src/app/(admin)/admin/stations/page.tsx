import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { StationForm } from "./station-form";
import { StationActions } from "./station-actions";

export default async function AdminStationsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const events = await db.stationEvent.findMany({ orderBy: { date: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">驿站活动</h1>
          <p className="text-slate-500 text-sm mt-1">共 {events.length} 场活动</p>
        </div>
        <StationForm />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {events.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">暂无驿站活动</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">活动名称</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">区域</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">地址</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">日期</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">时间</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">状态</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{e.title}</td>
                  <td className="px-5 py-3.5 text-slate-600">{e.area}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs max-w-[160px] truncate">{e.address}</td>
                  <td className="px-5 py-3.5 text-slate-600 text-xs">{formatDate(e.date)}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{e.startTime}–{e.endTime}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${e.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {e.isActive ? "进行中" : "已结束"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StationActions id={e.id} isActive={e.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

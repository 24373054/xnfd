"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

interface Props { id: string; status: string; isPublic: boolean; description: string; result: string | null; }

export function CaseActions({ id, status, isPublic, description, result }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = async (data: object) => {
    setSaving(true);
    await fetch(`/api/cases/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors">
        <Eye className="w-3.5 h-3.5" /> 详情
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 mb-4">案例详情</h3>
            <div className="space-y-3 text-sm mb-5">
              <div><span className="text-slate-400 text-xs uppercase tracking-wide">案例描述</span><p className="text-slate-700 mt-1 leading-relaxed">{description}</p></div>
              {result && <div><span className="text-slate-400 text-xs uppercase tracking-wide">处理结果</span><p className="text-slate-700 mt-1 leading-relaxed">{result}</p></div>}
            </div>
            <div className="flex gap-2 flex-wrap">
              {status !== "resolved" && <button onClick={() => update({ status: "resolved" })} disabled={saving} className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 disabled:opacity-50 transition-colors">标记已解决</button>}
              {status !== "processing" && <button onClick={() => update({ status: "processing" })} disabled={saving} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 disabled:opacity-50 transition-colors">标记处理中</button>}
              <button onClick={() => update({ isPublic: !isPublic })} disabled={saving} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 disabled:opacity-50 transition-colors">
                {isPublic ? "取消前台展示" : "设为前台展示"}
              </button>
              <button onClick={() => setOpen(false)} className="ml-auto px-3 py-1.5 text-slate-500 text-xs font-medium hover:text-slate-700 transition-colors">关闭</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

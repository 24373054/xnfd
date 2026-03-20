"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Eye } from "lucide-react";

interface Props {
  id: string;
  status: string;
  description: string;
  evidence: string | null;
  adminNote: string | null;
}

export function RightsActions({ id, status, description, evidence, adminNote }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(adminNote ?? "");
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    await fetch(`/api/rights/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, adminNote: note }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
      >
        <Eye className="w-3.5 h-3.5" /> 详情
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 mb-4">申请详情</h3>
            <div className="space-y-3 text-sm mb-5">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">问题描述</span>
                <p className="text-slate-700 mt-1 leading-relaxed">{description}</p>
              </div>
              {evidence && (
                <div>
                  <span className="text-slate-400 text-xs uppercase tracking-wide">证据情况</span>
                  <p className="text-slate-700 mt-1 leading-relaxed">{evidence}</p>
                </div>
              )}
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">处理备注</span>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="添加处理备注..."
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {status !== "processing" && (
                <button
                  onClick={() => updateStatus("processing")}
                  disabled={saving}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  标记处理中
                </button>
              )}
              {status !== "resolved" && (
                <button
                  onClick={() => updateStatus("resolved")}
                  disabled={saving}
                  className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  标记已解决
                </button>
              )}
              {status !== "pending" && (
                <button
                  onClick={() => updateStatus("pending")}
                  disabled={saving}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 disabled:opacity-50 transition-colors"
                >
                  重置待处理
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="ml-auto px-3 py-1.5 text-slate-500 text-xs font-medium hover:text-slate-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

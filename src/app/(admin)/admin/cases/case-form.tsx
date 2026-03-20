"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { AREAS, SERVICE_TYPES } from "@/lib/constants";

export function CaseForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", type: "", area: "", description: "", result: "", isPublic: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setOpen(false);
    setForm({ title: "", type: "", area: "", description: "", result: "", isPublic: false });
    router.refresh();
  };

  const inputCls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
        <Plus className="w-4 h-4" /> 新增案例
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 mb-5">新增服务案例</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">案例标题 *</label>
                <input required className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="简短描述案例" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">类型 *</label>
                  <select required className={inputCls} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="">请选择</option>
                    {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">区域 *</label>
                  <select required className={inputCls} value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
                    <option value="">请选择</option>
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">案例描述 *</label>
                <textarea required className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">处理结果</label>
                <textarea className={`${inputCls} resize-none`} rows={2} value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} placeholder="案例最终处理结果..." />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={form.isPublic} onChange={e => setForm(f => ({ ...f, isPublic: e.target.checked }))} className="w-4 h-4 accent-green-600" />
                在前台展示此案例
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
                  {saving ? "保存中..." : "保存案例"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-slate-500 text-sm hover:text-slate-700 transition-colors">取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

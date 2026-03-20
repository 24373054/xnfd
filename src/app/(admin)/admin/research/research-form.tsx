"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { AREAS, SUBJECT_TYPES } from "@/lib/constants";

export function ResearchForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    area: "", subject: "", type: "", contact: "", date: "", issues: "", notes: "", hasIntent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        issues: JSON.stringify(form.issues.split("\n").filter(Boolean)),
        date: new Date(form.date).toISOString(),
      }),
    });
    setSaving(false);
    setOpen(false);
    setForm({ area: "", subject: "", type: "", contact: "", date: "", issues: "", notes: "", hasIntent: false });
    router.refresh();
  };

  const inputCls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus className="w-4 h-4" /> 新增记录
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-slate-900 mb-5">新增调研记录</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">区域 *</label>
                  <select required className={inputCls} value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
                    <option value="">请选择</option>
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">主体类型 *</label>
                  <select required className={inputCls} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="">请选择</option>
                    {SUBJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">受访主体名称 *</label>
                <input required className={inputCls} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="如：蔡甸莲藕合作社A" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">联系方式</label>
                  <input className={inputCls} value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="电话或微信" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">走访日期 *</label>
                  <input required type="date" className={inputCls} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">发现问题（每行一条）*</label>
                <textarea required className={`${inputCls} resize-none`} rows={3} value={form.issues} onChange={e => setForm(f => ({ ...f, issues: e.target.value }))} placeholder={"无书面合同\n电商侵权"} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">备注</label>
                <textarea className={`${inputCls} resize-none`} rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={form.hasIntent} onChange={e => setForm(f => ({ ...f, hasIntent: e.target.checked }))} className="w-4 h-4 accent-green-600" />
                受访主体表达服务意向
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
                  {saving ? "保存中..." : "保存记录"}
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

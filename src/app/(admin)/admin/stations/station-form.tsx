"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export function StationForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", area: "", address: "",
    date: "", startTime: "09:00", endTime: "17:00", description: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
      });
      if (!res.ok) throw new Error("failed");
      setOpen(false);
      setForm({ title: "", area: "", address: "", date: "", startTime: "09:00", endTime: "17:00", description: "" });
      window.location.reload();
    } catch {
      alert("提交失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md transition-colors"
      >
        <Plus className="w-4 h-4" /> 新增活动
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">新增驿站活动</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">活动名称</label>
                <input required value={form.title} onChange={e => set("title", e.target.value)}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="如：蔡甸莲藕产业法律服务进村活动" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">区域</label>
                  <select required value={form.area} onChange={e => set("area", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">请选择</option>
                    <option>黄陂区</option>
                    <option>蔡甸区</option>
                    <option>新洲区</option>
                    <option>汉南区</option>
                    <option>洪山区</option>
                    <option>江夏区</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                  <input required type="date" value={form.date} onChange={e => set("date", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">详细地址</label>
                <input required value={form.address} onChange={e => set("address", e.target.value)}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="如：黄陂区木兰乡镇政府大院" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">开始时间</label>
                  <input required type="time" value={form.startTime} onChange={e => set("startTime", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">结束时间</label>
                  <input required type="time" value={form.endTime} onChange={e => set("endTime", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">活动说明（选填）</label>
                <textarea value={form.description} onChange={e => set("description", e.target.value)}
                  rows={3}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="活动内容简介..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  取消
                </button>
                <button type="submit" disabled={loading}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold rounded-md transition-colors">
                  {loading ? "提交中..." : "确认新增"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

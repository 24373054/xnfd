"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { AREAS, RIGHTS_TYPES } from "@/lib/constants";

const inputCls = "w-full px-4 py-3 glass rounded-md text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 border border-white/10 bg-transparent transition-colors";
const labelCls = "block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2";

export function RightsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", area: "", type: "", description: "", evidence: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/rights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">申请已提交</h2>
        <p className="text-white/40 text-sm">我们将在1个工作日内与您联系，请保持手机畅通。</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-7">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>姓名 *</label>
            <input required className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="您的姓名" />
          </div>
          <div>
            <label className={labelCls}>联系电话 *</label>
            <input required className={inputCls} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="手机号码" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>所在区域 *</label>
            <select required className={inputCls} value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
              <option value="" className="bg-[#0d140d]">请选择</option>
              {AREAS.map(a => <option key={a} value={a} className="bg-[#0d140d]">{a}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>侵权类型 *</label>
            <select required className={inputCls} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="" className="bg-[#0d140d]">请选择</option>
              {RIGHTS_TYPES.map(t => <option key={t} value={t} className="bg-[#0d140d]">{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>问题描述 *</label>
          <textarea
            required
            className={`${inputCls} min-h-[120px] resize-y`}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="请详细描述您遇到的问题，包括时间、地点、涉及金额等..."
          />
        </div>

        <div>
          <label className={labelCls}>证据情况（选填）</label>
          <textarea
            className={`${inputCls} min-h-[80px] resize-y`}
            value={form.evidence}
            onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))}
            placeholder="描述您已有的证据，如截图、合同、录音等..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 btn-primary rounded-md text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "提交中..." : "提交维权申请"}
        </button>
      </form>
    </div>
  );
}

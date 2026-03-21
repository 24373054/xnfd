"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { AREAS, RIGHTS_TYPES } from "@/lib/constants";

const inputCls = "w-full px-4 py-3 rounded-md text-sm focus:outline-none transition-colors";
const inputStyle: React.CSSProperties = {
  color: "var(--text-primary)",
  background: "var(--glass-bg)",
  border: "1px solid var(--glass-border)",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.5rem",
  color: "var(--text-muted)",
};
const selectOptionStyle: React.CSSProperties = { background: "var(--bg-card)" };

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
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" }}>
          <CheckCircle className="w-8 h-8" style={{ color: "var(--accent)" }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>申请已提交</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>我们将在1个工作日内与您联系，请保持手机畅通。</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-7">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>姓名 *</label>
            <input required className={inputCls} style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="您的姓名" />
          </div>
          <div>
            <label style={labelStyle}>联系电话 *</label>
            <input required className={inputCls} style={inputStyle} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="手机号码" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>所在区域 *</label>
            <select required className={inputCls} style={inputStyle} value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
              <option value="" style={selectOptionStyle}>请选择</option>
              {AREAS.map(a => <option key={a} value={a} style={selectOptionStyle}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>侵权类型 *</label>
            <select required className={inputCls} style={inputStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="" style={selectOptionStyle}>请选择</option>
              {RIGHTS_TYPES.map(t => <option key={t} value={t} style={selectOptionStyle}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>问题描述 *</label>
          <textarea
            required
            className={`${inputCls} min-h-[120px] resize-y`}
            style={inputStyle}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="请详细描述您遇到的问题，包括时间、地点、涉及金额等..."
          />
        </div>

        <div>
          <label style={labelStyle}>证据情况（选填）</label>
          <textarea
            className={`${inputCls} min-h-[80px] resize-y`}
            style={inputStyle}
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

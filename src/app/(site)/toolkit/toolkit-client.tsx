"use client";
import { useState } from "react";
import {
  FileText, Users, ShoppingCart, ClipboardList, Search, Download,
  Edit3, ArrowLeft, CheckCircle, AlertTriangle, XCircle, Loader2,
  Sparkles, Wand2, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TEMPLATES, SAFETY_ITEMS, GI_ITEMS } from "@/lib/toolkit-data";

type View = "list" | "editor" | "contract-check" | "safety-check" | "gi-check" | "safety-report" | "gi-report";

interface ContractItem { level: "ok" | "warn" | "error"; text: string }

const MODEL_LABEL = "DeepSeek-V3";

function ModelBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-green-500/10 border border-green-500/20 text-green-400/80">
      <Sparkles className="w-2.5 h-2.5" />{MODEL_LABEL}
    </span>
  );
}

export function ToolkitClient() {
  const [view, setView] = useState<View>("list");
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  // contract check
  const [contractText, setContractText] = useState("");
  const [contractResult, setContractResult] = useState<ContractItem[]>([]);
  const [contractLoading, setContractLoading] = useState(false);

  // safety check
  const [safetyChecked, setSafetyChecked] = useState<Record<string, boolean>>({});
  const [safetyAdvice, setSafetyAdvice] = useState("");
  const [safetyAdviceLoading, setSafetyAdviceLoading] = useState(false);

  // gi check
  const [giChecked, setGiChecked] = useState<Record<string, boolean>>({});
  const [giAdvice, setGiAdvice] = useState("");
  const [giAdviceLoading, setGiAdviceLoading] = useState(false);

  // AI fill modal
  const [fillOpen, setFillOpen] = useState(false);
  const [fillDesc, setFillDesc] = useState("");
  const [fillLoading, setFillLoading] = useState(false);

  const openEditor = (title: string, content: string) => {
    setEditorTitle(title); setEditorContent(content); setView("editor"); window.scrollTo(0, 0);
  };

  const download = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  };

  // ── AI 合同审查 ──
  const analyzeContract = async () => {
    if (!contractText.trim()) return;
    setContractLoading(true);
    setContractResult([]);
    try {
      const res = await fetch("/api/ai/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: contractText }),
      });
      const data = await res.json();
      if (data.items) setContractResult(data.items);
      else setContractResult([{ level: "error", text: "分析失败，请稍后重试" }]);
    } catch {
      setContractResult([{ level: "error", text: "网络错误，请稍后重试" }]);
    } finally {
      setContractLoading(false);
    }
  };

  // ── AI 整改建议（安全自查）──
  const fetchSafetyAdvice = async (uncheckedItems: string[]) => {
    setSafetyAdviceLoading(true);
    setSafetyAdvice("");
    try {
      const res = await fetch("/api/ai/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "safety", uncheckedItems }),
      });
      const data = await res.json();
      setSafetyAdvice(data.advice ?? "");
    } catch {
      setSafetyAdvice("获取建议失败，请稍后重试。");
    } finally {
      setSafetyAdviceLoading(false);
    }
  };

  // ── AI 整改建议（地标自查）──
  const fetchGiAdvice = async (uncheckedItems: string[]) => {
    setGiAdviceLoading(true);
    setGiAdvice("");
    try {
      const res = await fetch("/api/ai/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "gi", uncheckedItems }),
      });
      const data = await res.json();
      setGiAdvice(data.advice ?? "");
    } catch {
      setGiAdvice("获取建议失败，请稍后重试。");
    } finally {
      setGiAdviceLoading(false);
    }
  };

  // ── AI 模板填充 ──
  const handleAiFill = async () => {
    if (!fillDesc.trim()) return;
    setFillLoading(true);
    try {
      const res = await fetch("/api/ai/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: editorContent, description: fillDesc }),
      });
      const data = await res.json();
      if (data.filled) setEditorContent(data.filled);
    } catch { /* ignore */ }
    finally {
      setFillLoading(false);
      setFillOpen(false);
      setFillDesc("");
    }
  };

  const safetyScore = Object.values(safetyChecked).filter(Boolean).length;
  const giScore = Object.values(giChecked).filter(Boolean).length;

  // ── Editor view ──
  if (view === "editor") {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">{editorTitle}</h2>
          <button onClick={() => setView("list")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </button>
        </div>
        <textarea
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          className="w-full min-h-[500px] glass rounded-lg p-5 font-mono text-sm text-white/80 resize-y focus:outline-none focus:border-green-500/50 border border-white/10 bg-transparent leading-relaxed"
        />
        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            onClick={() => setFillOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-md text-sm font-semibold text-green-400 hover:text-green-300 border border-green-500/20 hover:border-green-500/40 transition-all"
          >
            <Wand2 className="w-4 h-4" /> AI 智能填充
            <ModelBadge />
          </button>
          <button onClick={() => download(editorTitle + ".txt", editorContent)}
            className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-md text-sm font-semibold text-white">
            <Download className="w-4 h-4" /> 下载文件
          </button>
          <button onClick={() => setView("list")} className="px-5 py-2.5 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            完成
          </button>
        </div>

        {/* AI Fill Modal */}
        {fillOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md glass rounded-xl p-6 mx-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-green-400" />
                  <span className="font-semibold text-white text-sm">AI 智能填充</span>
                  <ModelBadge />
                </div>
                <button onClick={() => setFillOpen(false)} className="text-white/30 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/40 mb-3">描述你的具体情况，AI 将自动填写合同中的空白项</p>
              <textarea
                value={fillDesc}
                onChange={e => setFillDesc(e.target.value)}
                rows={4}
                placeholder="例如：甲方是武汉蔡甸莲藕合作社，乙方是某超市，采购蔡甸莲藕500公斤，单价8元/公斤，交货日期2025年3月1日..."
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white/80 resize-none focus:outline-none focus:border-green-500/50 placeholder-white/20"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAiFill}
                  disabled={!fillDesc.trim() || fillLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 btn-primary rounded-md text-sm font-semibold text-white disabled:opacity-40"
                >
                  {fillLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> 填充中...</> : <><Sparkles className="w-4 h-4" /> 开始填充</>}
                </button>
                <button onClick={() => setFillOpen(false)} className="px-4 py-2.5 glass rounded-md text-sm text-white/50 hover:text-white">
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Contract check view ──
  if (view === "contract-check") {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">合同智能审查</h2>
          <button onClick={() => setView("list")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </button>
        </div>
        <div className="glass rounded-lg p-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-white/50">将合同文本粘贴到下方，AI 将自动检测条款漏洞和风险点：</p>
            <ModelBadge />
          </div>
          <textarea
            value={contractText}
            onChange={e => setContractText(e.target.value)}
            rows={12}
            className="w-full bg-white/5 border border-white/10 rounded-md p-4 text-sm text-white/80 font-mono resize-y focus:outline-none focus:border-green-500/50 leading-relaxed"
            placeholder="请将合同全文粘贴到此处..."
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-white/20">{contractText.length} 字</span>
            <button
              onClick={analyzeContract}
              disabled={!contractText.trim() || contractLoading}
              className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-md text-sm font-semibold text-white disabled:opacity-40"
            >
              {contractLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> AI 分析中...</> : <><Search className="w-4 h-4" /> 开始审查</>}
            </button>
          </div>
        </div>

        {contractResult.length > 0 && (
          <div className="glass rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
              <span className="text-sm font-semibold text-white">审查结果</span>
              <span className="text-xs text-white/30">
                {contractResult.filter(r => r.level === "error").length} 个风险 ·{" "}
                {contractResult.filter(r => r.level === "warn").length} 个建议 ·{" "}
                {contractResult.filter(r => r.level === "ok").length} 项合规
              </span>
              <ModelBadge />
            </div>
            {contractResult.map((r, i) => (
              <div key={i} className={cn(
                "flex items-start gap-3 px-5 py-3.5 border-b border-white/5 last:border-0 text-sm leading-relaxed",
                r.level === "ok" && "text-green-300/90",
                r.level === "warn" && "text-amber-300/90",
                r.level === "error" && "text-red-300/90"
              )}>
                {r.level === "ok" && <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-green-400" />}
                {r.level === "warn" && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />}
                {r.level === "error" && <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />}
                <span>{r.text}</span>
              </div>
            ))}
            <div className="px-5 py-3 border-t border-white/5">
              <p className="text-xs text-white/20">如需专业法律意见，请拨打咨询热线：027-87218899</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Safety check view ──
  if (view === "safety-check") {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">文旅项目安全自查</h2>
          <button onClick={() => setView("list")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </button>
        </div>
        <div className="space-y-5">
          {SAFETY_ITEMS.map(group => (
            <div key={group.category} className="glass rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{group.category}</span>
                <span className="text-xs text-white/30">
                  {group.items.filter(item => safetyChecked[item.id]).length}/{group.items.length}
                </span>
              </div>
              {group.items.map(item => (
                <label key={item.id} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/3 transition-colors">
                  <input
                    type="checkbox"
                    checked={!!safetyChecked[item.id]}
                    onChange={e => setSafetyChecked(prev => ({ ...prev, [item.id]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 accent-green-500 shrink-0"
                  />
                  <div>
                    <span className="text-sm text-white/80">{item.text}</span>
                    {item.risk && <p className="text-xs text-amber-400/70 mt-0.5">{item.risk}</p>}
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-white/40">已完成 {safetyScore}/{SAFETY_ITEMS.flatMap(g => g.items).length} 项</span>
          <button
            onClick={() => {
              const unchecked = SAFETY_ITEMS.flatMap(g => g.items).filter(i => !safetyChecked[i.id]).map(i => i.text);
              setView("safety-report");
              if (unchecked.length > 0) fetchSafetyAdvice(unchecked);
              window.scrollTo(0, 0);
            }}
            className="px-5 py-2.5 btn-primary rounded-md text-sm font-semibold text-white"
          >
            生成自查报告
          </button>
        </div>
      </div>
    );
  }

  // ── Safety report view ──
  if (view === "safety-report") {
    const allItems = SAFETY_ITEMS.flatMap(g => g.items);
    const unchecked = allItems.filter(item => !safetyChecked[item.id]);
    const checked = allItems.filter(item => safetyChecked[item.id]);
    const score = Math.round((checked.length / allItems.length) * 100);
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">安全自查报告</h2>
          <button onClick={() => setView("safety-check")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回自查
          </button>
        </div>
        <div className="glass rounded-lg p-6 mb-5 flex items-center gap-6">
          <div className={cn("text-5xl font-black", score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400")}>{score}%</div>
          <div>
            <div className="text-white font-semibold mb-1">
              {score >= 80 ? "合规状况良好" : score >= 60 ? "存在一定风险" : "存在较多安全隐患"}
            </div>
            <div className="text-sm text-white/40">已完成 {checked.length} 项，待整改 {unchecked.length} 项</div>
          </div>
        </div>
        {unchecked.length > 0 && (
          <div className="glass rounded-lg overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-white/5 text-sm font-semibold text-red-400">待整改项目（{unchecked.length}项）</div>
            {unchecked.map(item => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-0">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <span className="text-sm text-white/80">{item.text}</span>
                  {item.risk && <p className="text-xs text-amber-400/70 mt-0.5">{item.risk}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI 整改建议 */}
        {unchecked.length > 0 && (
          <div className="glass rounded-lg overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">AI 整改建议</span>
              <ModelBadge />
            </div>
            <div className="px-5 py-4">
              {safetyAdviceLoading ? (
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Loader2 className="w-4 h-4 animate-spin text-green-400" /> AI 正在生成个性化整改建议...
                </div>
              ) : safetyAdvice ? (
                <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">{safetyAdvice}</p>
              ) : (
                <button
                  onClick={() => fetchSafetyAdvice(unchecked.map(i => i.text))}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-green-400 hover:text-green-300 border border-green-500/20"
                >
                  <Wand2 className="w-4 h-4" /> 获取 AI 整改建议
                </button>
              )}
            </div>
          </div>
        )}

        <div className="glass rounded-lg p-4 text-xs text-white/30">
          如需专业安全合规指导，请联系：027-87218899 或 fadun@xingnong.org.cn
        </div>
      </div>
    );
  }

  // ── GI check view ──
  if (view === "gi-check") {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">地理标志合规自查</h2>
          <button onClick={() => setView("list")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </button>
        </div>
        <div className="space-y-5">
          {GI_ITEMS.map(group => (
            <div key={group.category} className="glass rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{group.category}</span>
                <span className="text-xs text-white/30">
                  {group.items.filter(item => giChecked[item.id]).length}/{group.items.length}
                </span>
              </div>
              {group.items.map(item => (
                <label key={item.id} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/3 transition-colors">
                  <input
                    type="checkbox"
                    checked={!!giChecked[item.id]}
                    onChange={e => setGiChecked(prev => ({ ...prev, [item.id]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 accent-green-500 shrink-0"
                  />
                  <div>
                    <span className="text-sm text-white/80">{item.text}</span>
                    {item.risk && <p className="text-xs text-amber-400/70 mt-0.5">{item.risk}</p>}
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-white/40">已完成 {giScore}/{GI_ITEMS.flatMap(g => g.items).length} 项</span>
          <button
            onClick={() => {
              const unchecked = GI_ITEMS.flatMap(g => g.items).filter(i => !giChecked[i.id]).map(i => i.text);
              setView("gi-report");
              if (unchecked.length > 0) fetchGiAdvice(unchecked);
              window.scrollTo(0, 0);
            }}
            className="px-5 py-2.5 btn-primary rounded-md text-sm font-semibold text-white"
          >
            生成合规报告
          </button>
        </div>
      </div>
    );
  }

  // ── GI report view ──
  if (view === "gi-report") {
    const allItems = GI_ITEMS.flatMap(g => g.items);
    const unchecked = allItems.filter(item => !giChecked[item.id]);
    const checked = allItems.filter(item => giChecked[item.id]);
    const score = Math.round((checked.length / allItems.length) * 100);
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">地理标志合规报告</h2>
          <button onClick={() => setView("gi-check")} className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回自查
          </button>
        </div>
        <div className="glass rounded-lg p-6 mb-5 flex items-center gap-6">
          <div className={cn("text-5xl font-black", score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400")}>{score}%</div>
          <div>
            <div className="text-white font-semibold mb-1">
              {score >= 80 ? "地标使用合规" : score >= 60 ? "存在合规风险" : "存在违规使用风险"}
            </div>
            <div className="text-sm text-white/40">已完成 {checked.length} 项，待整改 {unchecked.length} 项</div>
          </div>
        </div>
        {unchecked.length > 0 && (
          <div className="glass rounded-lg overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-white/5 text-sm font-semibold text-red-400">待整改项目（{unchecked.length}项）</div>
            {unchecked.map(item => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 border-b border-white/5 last:border-0">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <span className="text-sm text-white/80">{item.text}</span>
                  {item.risk && <p className="text-xs text-amber-400/70 mt-0.5">{item.risk}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI 整改建议 */}
        {unchecked.length > 0 && (
          <div className="glass rounded-lg overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">AI 整改建议</span>
              <ModelBadge />
            </div>
            <div className="px-5 py-4">
              {giAdviceLoading ? (
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Loader2 className="w-4 h-4 animate-spin text-green-400" /> AI 正在生成个性化整改建议...
                </div>
              ) : giAdvice ? (
                <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">{giAdvice}</p>
              ) : (
                <button
                  onClick={() => fetchGiAdvice(unchecked.map(i => i.text))}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-md text-sm text-green-400 hover:text-green-300 border border-green-500/20"
                >
                  <Wand2 className="w-4 h-4" /> 获取 AI 整改建议
                </button>
              )}
            </div>
          </div>
        )}

        <div className="glass rounded-lg p-4 text-xs text-white/30">
          如需专业地标合规指导，请联系：027-87218899 或 fadun@xingnong.org.cn
        </div>
      </div>
    );
  }

  // ── List view ──
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {TEMPLATES.map((t) => {
        const Icon = t.icon;
        return (
          <div key={t.id} className="glass rounded-lg overflow-hidden card-hover group flex flex-col">
            <div className="p-6 flex-1">
              <div className="w-11 h-11 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{t.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{t.desc}</p>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {t.actions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => {
                    if (a.type === "editor") openEditor(t.title, t.content ?? "");
                    if (a.type === "download") download(t.filename ?? t.title + ".txt", t.content ?? "");
                    if (a.type === "check") {
                      if (t.checkType === "contract") setView("contract-check");
                      else if (t.checkType === "safety") setView("safety-check");
                      else if (t.checkType === "gi") setView("gi-check");
                      window.scrollTo(0, 0);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all",
                    a.primary ? "btn-primary text-white" : "glass text-white/60 hover:text-white"
                  )}
                >
                  {a.type === "editor" && <Edit3 className="w-3.5 h-3.5" />}
                  {a.type === "download" && <Download className="w-3.5 h-3.5" />}
                  {a.type === "check" && <Search className="w-3.5 h-3.5" />}
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

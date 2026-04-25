"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "蔡甸莲藕被人冒用商标怎么办？",
  "民宿需要办哪些证件？",
  "土地流转合同要注意什么？",
  "农产品电商被平台扣款如何维权？",
];

function AssistantBody({ content }: { content: string }) {
  const plugins = useMemo(() => [remarkGfm, remarkBreaks], []);
  if (!content) return null;
  return (
    <div className="ai-agent-md">
      <ReactMarkdown remarkPlugins={plugins}>{content}</ReactMarkdown>
    </div>
  );
}

export function AiAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "你好！我是兴农法盾法律助手，专注于武汉农文旅领域的法律问题。\n\n可以问我关于地理标志保护、合同纠纷、乡村文旅合规、维权流程等问题。",
      }]);
    }
  }, [open, messages.length]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error("请求失败");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              assistantMsg += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantMsg };
                return updated;
              });
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "抱歉，连接出现问题，请稍后重试。如需紧急咨询请拨打 027-87218899。" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const panelStyle = useMemo(
    () =>
      ({
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--glass-border)",
      }) as React.CSSProperties,
    []
  );

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
          "btn-primary",
          open ? "scale-90" : "scale-100 hover:scale-110"
        )}
        aria-label="打开法律助手"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
            style={{ background: "var(--accent-lighter)" }}
          />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] flex flex-col rounded-xl overflow-hidden shadow-2xl border"
          style={panelStyle}
        >

          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: "var(--glass-border)", background: "color-mix(in srgb, var(--glass-bg) 65%, transparent)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)",
              }}
            >
              <Bot className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate text-body">兴农法盾助手</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-light)" }} />
                <span className="text-[10px] text-sub">在线 · DeepSeek-V3</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="transition-colors shrink-0 p-1 rounded-md hover:bg-[var(--glass-bg)]"
              style={{ color: "var(--text-muted)" }}
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border"
                  style={
                    msg.role === "user"
                      ? {
                          background: "color-mix(in srgb, var(--accent) 22%, transparent)",
                          borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
                        }
                      : {
                          background: "var(--glass-bg)",
                          borderColor: "var(--glass-border)",
                        }
                  }
                >
                  {msg.role === "user"
                    ? <User className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    : <Bot className="w-3.5 h-3.5 text-muted-t" />}
                </div>
                <div
                  className="max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed border"
                  style={
                    msg.role === "user"
                      ? {
                          background: "color-mix(in srgb, var(--accent) 16%, transparent)",
                          color: "var(--text-primary)",
                          borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)",
                        }
                      : {
                          background: "var(--glass-bg)",
                          borderColor: "var(--glass-border)",
                        }
                  }
                >
                  {msg.role === "user" ? (
                    <span className="whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>{msg.content}</span>
                  ) : (
                    <AssistantBody content={msg.content} />
                  )}
                  {msg.role === "assistant" && i === messages.length - 1 && loading && (
                    <span
                      className="inline-block w-1 h-4 ml-0.5 align-middle animate-pulse rounded-sm"
                      style={{ background: "var(--accent-light)" }}
                    />
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center border"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
                >
                  <Bot className="w-3.5 h-3.5 text-muted-t" />
                </div>
                <div className="rounded-lg px-3.5 py-2.5 border glass">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 glass rounded-full transition-colors hover:opacity-90"
                  style={{ color: "var(--accent)", borderColor: "var(--glass-border)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="px-3 pb-3 pt-2 border-t" style={{ borderColor: "var(--glass-border)" }}>
            <div className="flex items-end gap-2 glass rounded-lg px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder="输入法律问题..."
                className="flex-1 bg-transparent text-sm resize-none focus:outline-none max-h-24 leading-relaxed placeholder:text-[color:var(--text-muted)]"
                style={{ minHeight: "24px", color: "var(--text-primary)" }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-md btn-primary flex items-center justify-center shrink-0 disabled:opacity-30 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-1 mt-1.5 px-1">
              <Sparkles className="w-3 h-3 text-accent opacity-40" />
              <span className="text-[10px] text-muted-t">由 DeepSeek-V3 驱动 · 仅供参考，不构成法律意见</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

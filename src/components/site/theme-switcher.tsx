"use client";
import { useState } from "react";
import { Monitor, Moon, Sun, Sunrise } from "lucide-react";
import { useTheme, type Theme } from "./theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Theme; label: string; icon: React.ElementType; color: string }[] = [
  { value: "system", label: "跟随系统", icon: Monitor, color: "text-gray-400" },
  { value: "dark",   label: "深绿黑",   icon: Moon,    color: "text-green-400" },
  { value: "blue",   label: "白底蓝",   icon: Sun,     color: "text-blue-500" },
  { value: "peach",  label: "浅橘色",   icon: Sunrise, color: "text-orange-400" },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolved } = useTheme();
  const [open, setOpen] = useState(false);

  const current = OPTIONS.find(o => o.value === theme) ?? OPTIONS[0];
  const Icon = current.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
          "glass hover:border-[var(--accent)]/40",
          current.color
        )}
        aria-label="切换主题"
        title="切换主题"
      >
        <Icon className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-36 glass rounded-xl overflow-hidden shadow-2xl border border-[var(--glass-border)]">
            {OPTIONS.map(opt => {
              const OIcon = opt.icon;
              const active = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => { setTheme(opt.value); setOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
                  )}
                >
                  <OIcon className={cn("w-3.5 h-3.5 shrink-0", opt.color)} />
                  {opt.label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

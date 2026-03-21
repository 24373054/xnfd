"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "blue" | "peach" | "system";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "dark" | "blue" | "peach";
}

const Ctx = createContext<ThemeCtx>({ theme: "system", setTheme: () => {}, resolved: "dark" });

export function useTheme() { return useContext(Ctx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemDark, setSystemDark] = useState(true);

  // 读取系统偏好
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 读取 localStorage
  useEffect(() => {
    const saved = localStorage.getItem("xnfd-theme") as Theme | null;
    if (saved) setThemeState(saved);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("xnfd-theme", t);
  };

  const resolved: "dark" | "blue" | "peach" =
    theme === "system" ? (systemDark ? "dark" : "blue") : theme;

  // 写入 data-theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);

  return <Ctx.Provider value={{ theme, setTheme, resolved }}>{children}</Ctx.Provider>;
}

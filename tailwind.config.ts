import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        green: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        dark: {
          50:  "#0a0f0a",
          100: "#0d140d",
          200: "#111811",
          300: "#162016",
          400: "#1a281a",
        },
      },
      backgroundImage: {
        "grid-green": "linear-gradient(rgba(22,163,74,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.08) 1px, transparent 1px)",
        "grid-dark": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-green": "radial-gradient(ellipse at center, rgba(22,163,74,0.15) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(22,163,74,0.2) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float2": "float2 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "shimmer": "shimmer 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(15px) scale(0.95)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        "glow-green": "0 0 40px rgba(22,163,74,0.3), 0 0 80px rgba(22,163,74,0.1)",
        "glow-sm": "0 0 20px rgba(22,163,74,0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(22,163,74,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

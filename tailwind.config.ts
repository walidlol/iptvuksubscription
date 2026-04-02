import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: "var(--bg-deep)",
          primary: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          glass: "var(--bg-glass)",
          "glass-hover": "var(--bg-glass-hover)",
        },
        border: {
          glass: "var(--border-glass)",
          "glass-strong": "var(--border-glass-strong)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: "var(--accent)",
        // Red kept only for LIVE badges + error states
        live: "#E8392A",
      },
      fontFamily: {
        heading: ["var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero-h1": [
          "clamp(42px, 8vw, 80px)",
          { lineHeight: "1.05", letterSpacing: "0.04em" },
        ],
        "section-h2": [
          "clamp(28px, 5vw, 48px)",
          { lineHeight: "1.1", letterSpacing: "0.04em" },
        ],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.15)",
        "glass-hover": "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.20)",
        "glass-sm": "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 0 rgba(255,255,255,0.10)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)",
        "hero-gradient-left":
          "linear-gradient(to right, var(--bg-primary) 0%, transparent 40%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      borderRadius: {
        glass: "16px",
        "glass-sm": "12px",
        "glass-lg": "24px",
      },
      keyframes: {
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-live": "pulse-live 1.5s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;

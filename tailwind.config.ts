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
        // Cinematic teal for accents, borders, glows
        teal: {
          DEFAULT: "#183949",
          light: "#1f4d63",
          glow: "rgba(24,57,73,0.5)",
        },
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
        "teal-glow": "0 0 40px rgba(24,57,73,0.4), 0 0 80px rgba(24,57,73,0.15)",
        "teal-glow-sm": "0 0 20px rgba(24,57,73,0.3)",
      },
      backgroundImage: {
        "cinematic":
          "linear-gradient(to top left, #183949 0%, #040405 65%)",
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "pulse-live": "pulse-live 1.5s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite linear",
        "float": "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;

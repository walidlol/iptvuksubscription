/**
 * tailwind.config.ts
 *
 * Tailwind v4 note: this file is referenced via `@config` in globals.css.
 * Color tokens, fonts, keyframes, and animations are defined in CSS using
 * @theme inline — that is Tailwind v4's primary config mechanism.
 * This file handles darkMode mode selector, plugins, and content paths.
 *
 * Design tokens source of truth: CLAUDE.md §3 Visual Identity System
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind v4 auto-detects content, but explicit paths are kept for clarity
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],

  // Theme switching via [data-theme] attribute (set in layout.tsx)
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {
      // ── Colors (CLAUDE.md §3) ─────────────────────────────────────
      // Primary source of truth is @theme inline in globals.css.
      // These extend Tailwind's default palette as static fallbacks.
      colors: {
        'bg-base':          '#08090D',
        'bg-surface':       '#0F1117',
        'bg-elevated':      '#161820',
        'accent-red':       '#E5181E',
        'accent-red-glow':  'rgba(229,24,30,0.25)',
        'accent-blue':      '#1A56DB',
        'accent-blue-glow': 'rgba(26,86,219,0.2)',
        'text-primary':     '#F0F2F7',
        'text-muted':       '#6B7280',
        'light-base':       '#F4F6FB',
        'light-surface':    '#FFFFFF',
        'light-text':       '#111827',
      },

      // ── Font families ─────────────────────────────────────────────
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'Menlo', 'monospace'],
        ui:      ['Geist', '"Neue Haas Grotesk"', 'Inter', 'sans-serif'],
      },

      // ── Box shadows ───────────────────────────────────────────────
      boxShadow: {
        'glow-red':    '0 0 24px rgba(229, 24, 30, 0.35)',
        'glow-red-lg': '0 0 48px rgba(229, 24, 30, 0.50)',
        'glow-blue':   '0 0 24px rgba(26, 86, 219, 0.35)',
        card:          '0 8px 32px rgba(0, 0, 0, 0.40)',
        'card-lg':     '0 24px 64px rgba(0, 0, 0, 0.50)',
      },

      // ── Keyframes ─────────────────────────────────────────────────
      keyframes: {
        // Infinite horizontal content river (Hero background)
        stream: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Slow red glow loop for logo / accent elements
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(229,24,30,0.25)' },
          '50%':       { boxShadow: '0 0 32px 8px rgba(229,24,30,0.50)' },
        },
        'gradient-morph': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },

      // ── Animations ────────────────────────────────────────────────
      animation: {
        stream:           'stream 40s linear infinite',
        'stream-slow':    'stream 70s linear infinite',
        'pulse-glow':     'pulse-glow 3s ease-in-out infinite',
        'gradient-morph': 'gradient-morph 8s ease infinite',
        float:            'float 6s ease-in-out infinite',
        'fade-up':        'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },

      // ── Z-index layers (CLAUDE.md §3) ─────────────────────────────
      zIndex: {
        noise:   '0',
        blob:    '10',
        content: '20',
        card:    '30',
        nav:     '40',
        modal:   '50',
        toast:   '60',
      },

      // ── Easing ────────────────────────────────────────────────────
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Light Museum Palette ────────────────────────────────────
        ivory:    { DEFAULT: '#f8f7f4', dark: '#f0ece6', deeper: '#e8e2d9' },
        stone:    { DEFAULT: '#d1ccc4', light: '#e8e4de', dark: '#a09890' },
        marble:   { DEFAULT: '#e2e0dc', light: '#f4f2ef', dark: '#c8c4be' },
        ink:      { DEFAULT: '#0f172a', muted: '#334155', light: '#64748b' },
        // ── Jewel accent tones ──────────────────────────────────────
        ruby:     { DEFAULT: '#b91c1c', light: '#dc2626', muted: '#fee2e2' },
        sapphire: { DEFAULT: '#1d4ed8', light: '#3b82f6', muted: '#dbeafe' },
        emerald:  { DEFAULT: '#047857', light: '#10b981', muted: '#d1fae5' },
        amber:    { DEFAULT: '#b45309', light: '#f59e0b', muted: '#fef3c7' },
        // ── Legacy dark tokens (kept for chamber overlay elements) ──
        obsidian: '#0a0a0f',
        surface:  '#12121a',
        cyan:     { DEFAULT: '#06b6d4', dark: '#0891b2', glow: 'rgba(6,182,212,0.15)' },
      },
      fontFamily: {
        heading:    ['Be Vietnam Pro', 'sans-serif'],
        sans:       ['Inter', 'sans-serif'],
        mono:       ['JetBrains Mono', 'monospace'],
        orbitron:   ['Be Vietnam Pro', 'Inter', 'sans-serif'],
        'mono-space': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'card':      '0 2px 8px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'card-hover':'0 12px 40px rgba(15,23,42,0.14), 0 4px 8px rgba(15,23,42,0.08)',
        'glow':      '0 0 20px rgba(6,182,212,0.3)',
        'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'hotspot-ring': 'hotspot-ring 2s ease-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'spin-ring':    'spin 1.2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'hotspot-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '0.9' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
};

/* NEXANDR — design tokens.
   Loaded after the Tailwind Play CDN script on every page. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#080B09',
        charcoal: '#161B18',
        graphite: '#2A312D',
        forest: {
          DEFAULT: '#0B2E22',
          deep: '#06180F',
          mid: '#0F3A2B',
          soft: '#14523D',
        },
        emerald: {
          DEFAULT: '#0F7A56',
          bright: '#16A473',
          light: '#48CF9B',
        },
        lime: {
          DEFAULT: '#C4F04A',
          soft: '#E2F9AC',
        },
        cream: {
          DEFAULT: '#F5F2E9',
          deep: '#EBE6D9',
          light: '#FBFAF5',
        },
        line: '#E1DBCB',
      },
      maxWidth: {
        content: '1240px',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(8,11,9,0.04), 0 12px 32px -18px rgba(8,11,9,0.22)',
        lift: '0 2px 4px rgba(8,11,9,0.05), 0 28px 60px -28px rgba(11,46,34,0.38)',
        nav: '0 1px 0 rgba(225,219,203,0.9)',
      },
      animation: {
        'float-slow': 'floaty 18s ease-in-out infinite',
        'float-slower': 'floaty 26s ease-in-out infinite reverse',
        'dash': 'dash 9s linear infinite',
        'marquee': 'marquee 44s linear infinite',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-24px,0) scale(1.05)' },
        },
        dash: { to: { strokeDashoffset: '-1000' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
    },
  },
};

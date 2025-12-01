import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Backgrounds
        'tikaram-deep-forest': '#004225',
        'tikaram-off-white': '#F8F8F8',
        'tikaram-rich-black': '#050505',
        // Text Colors
        'tikaram-charcoal': '#36454F',
        'tikaram-cream': '#FFFDD0',
        'tikaram-pure-white': '#FFFFFF',
        // Accents
        'tikaram-gold': '#D4AF37',
        'tikaram-rust': '#B7410E',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        accent: ['var(--font-accent)', 'sans-serif'],
      },
      spacing: {
        'gap-xs': '0.25rem', // 4px
        'gap-s': '1rem', // 16px
        'gap-m': '2rem', // 32px
        'gap-l': '4rem', // 64px
        'gap-xl': '8rem', // 128px
      },
      borderRadius: {
        'sharp': '0px',
        'soft': '4px',
        'pill': '999px',
      },
      boxShadow: {
        'level-1': '0 2px 4px rgba(0,0,0,0.05)',
        'level-2': '0 12px 24px -4px rgba(0,0,0,0.12)',
        'level-3': '0 24px 48px -12px rgba(0,0,0,0.25)',
        'glow': '0 0 15px rgba(212, 175, 55, 0.3)',
      },
      letterSpacing: {
        'widest': '0.15em',
      },
    },
  },
  plugins: [],
}
export default config


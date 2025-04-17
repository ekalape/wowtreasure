import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        background_alt: 'var(--background-alt)',
        foreground_alt: 'var(--foreground-alt)',
        destructive_alt: 'var(--destructive-alt)',
        classColor: {
          priest_color: '#ffffff',
          mage_color: '#68d4fc',
          rogue_color: '#fff569',
          druid_color: '#ff7d0a',
          warlock_color: '#8d73db',
          paladin_color: '#f58cba',
          shaman_color: '#4184ff',
          hunter_color: '#abd473',
          warrior_color: '#bd7930',
          deathknight_color: '#c41f3b',
          monk_color: '#00ff96',
          demonhunter_color: '#a330c9',
          evoker_color: '#5dc5b0',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      zIndex: {
        '-1': '-1',
      },
      inset: {
        '1/2': '50%',
        '2/2': '100%',
      },
      fontFamily: {
        hachi: 'var(--font-hachi)',
        yatra: 'var(--font-yatra)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

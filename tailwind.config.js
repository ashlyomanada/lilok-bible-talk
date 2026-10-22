/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './app/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        // Theme Colors matching MICC "MNL" logo
        brand: {
          navy: '#0F1B26',      // Ink navy (primary dark)
          gray: '#D9D9D9',      // Soft gray (light surfaces)
          offwhite: '#F4F4F2',  // Off-white (cards & page bg)
          gold: '#F2B544',      // Sunrise gold accent
          goldHover: '#DE9F2D',
          coral: '#FF6B4A'       // Warm coral accent
        },
        navy: {
          50: '#F2F5F8',
          100: '#E4EAF0',
          200: '#C8D5E1',
          300: '#9BB4C9',
          400: '#688EAC',
          500: '#436B8C',
          600: '#2D4E6D',
          700: '#203952',
          800: '#17283A',
          850: '#12202E',
          900: '#0F1B26',      // Primary Ink Navy
          950: '#091017'       // Ultra Dark Navy
        },
        surface: {
          50: '#FAFAF9',
          100: '#F4F4F2',     // Primary Off-white
          200: '#EAEAE7',
          300: '#D9D9D9',     // Soft Gray
          400: '#BFBFBC',
          500: '#959591',
          600: '#6B6B67',
          700: '#4A4A46',
          800: '#2B2B28',
          900: '#181816'
        },
        accent: {
          50: '#FEF9EE',
          100: '#FDF1D5',
          200: '#FBE2A9',
          300: '#F8CF75',
          400: '#F5BE47',
          500: '#F2B544',     // Primary Sunrise Gold
          600: '#DE9F2D',
          700: '#BA7C1B',
          800: '#955F18',
          900: '#794D18'
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE7E1',
          200: '#FFD3C7',
          300: '#FFB3A1',
          400: '#FF886E',
          500: '#FF6B4A',     // Warm Coral
          600: '#E84D29',
          700: '#C43615',
          800: '#A12D13',
          900: '#832A15'
        },
        // Aliases for compatibility
        cream: {
          50: '#FDFCFB',
          100: '#F4F4F2',
          200: '#EAEAE7',
          300: '#D9D9D9',
          400: '#BFBFBC',
          500: '#959591'
        },
        gold: {
          50: '#FEF9EE',
          100: '#FDF1D5',
          200: '#FBE2A9',
          300: '#F8CF75',
          400: '#F5BE47',
          500: '#F2B544',
          600: '#DE9F2D',
          700: '#BA7C1B',
          800: '#955F18',
          900: '#794D18'
        },
        warmStone: {
          50: '#FAFAF9',
          100: '#F4F4F2',
          200: '#EAEAE7',
          300: '#D9D9D9',
          400: '#BFBFBC',
          500: '#959591',
          600: '#6B6B67',
          700: '#4A4A46',
          800: '#2B2B28',
          900: '#0F1B26'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 27, 38, 0.05)',
        'soft': '0 8px 24px -4px rgba(15, 27, 38, 0.08), 0 4px 12px -2px rgba(15, 27, 38, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(15, 27, 38, 0.12), 0 8px 16px -4px rgba(15, 27, 38, 0.06)',
        'soft-xl': '0 24px 56px -10px rgba(15, 27, 38, 0.20)',
        'glow-gold': '0 0 35px -5px rgba(242, 181, 68, 0.35)',
        'glow-accent': '0 0 45px -5px rgba(242, 181, 68, 0.45)',
        'dark-card': '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.1) inset'
      }
    }
  },
  plugins: []
}

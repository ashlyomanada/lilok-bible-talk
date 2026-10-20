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
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive']
      },
      colors: {
        // Deep Navy palette
        navy: {
          50: '#F2F5FC',
          100: '#E5EDF9',
          200: '#CADAF3',
          300: '#9FBCE9',
          400: '#6D99DC',
          500: '#4677CC',
          600: '#2F59AC',
          700: '#234488',
          800: '#1B3468',
          850: '#142750',
          900: '#0D1A38',
          950: '#070D1E'
        },
        // Warm Cream palette
        cream: {
          50: '#FDFCF8',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDC9',
          400: '#DCC7A7',
          500: '#C7AD86'
        },
        // Soft Gold palette
        gold: {
          50: '#FFFDF5',
          100: '#FEF9E3',
          200: '#FDF0BD',
          300: '#FCE38F',
          400: '#F7CE51',
          500: '#E8B323',
          600: '#C59012',
          700: '#9B6E0B',
          800: '#7B540E',
          900: '#4E3408'
        },
        // Sunrise Coral palette
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFD3C6',
          300: '#FFAE99',
          400: '#FF8A6E',
          500: '#FF6442',
          600: '#E64622',
          700: '#BA3314'
        },
        // Backwards compatibility aliases
        ivory: {
          50: '#FDFCF8',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDC9',
          400: '#DCC7A7'
        },
        amberGold: {
          50: '#FFFDF5',
          100: '#FEF9E3',
          200: '#FDF0BD',
          300: '#FCE38F',
          400: '#F7CE51',
          500: '#E8B323',
          600: '#C59012',
          700: '#9B6E0B',
          800: '#7B540E'
        },
        warmStone: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E5DFD7',
          300: '#CFC5B8',
          400: '#A39583',
          500: '#7D7060',
          600: '#5F5345',
          700: '#463B30',
          800: '#2F261E',
          900: '#1C150E',
          950: '#0F0B07'
        }
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(13, 26, 56, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'warm': '0 8px 24px -4px rgba(13, 26, 56, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(13, 26, 56, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'warm-xl': '0 24px 50px -12px rgba(13, 26, 56, 0.16), 0 12px 24px -6px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 40px -8px rgba(232, 179, 35, 0.35)',
        'card': '0 20px 60px -15px rgba(13, 26, 56, 0.25), 0 0 1px 1px rgba(255, 255, 255, 0.15) inset'
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        gentium: ['"Gentium Book Plus"', 'serif'],
        sans: ['"Noto Sans"', 'sans-serif'],
      },
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 15px 0 rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'parchment': "url('./src/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
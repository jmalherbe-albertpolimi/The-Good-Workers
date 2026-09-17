/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#23b5b0', light: '#e6f6f5' },
        navy: '#14143c',
        ink: '#1f1f1f',
        muted: '#8a8a8a',
        paper: '#f7f6f2',
        tile: '#f2f1ec',
        danger: '#e5352b',
        star: '#f7c948',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        luxury: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          text: '#111111',
          accent: '#1E3A8A',
          accentDark: '#172F6F',
        },
      },
      boxShadow: {
        soft: '0 4px 12px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}


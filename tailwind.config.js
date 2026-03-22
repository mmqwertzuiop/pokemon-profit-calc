/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pkm: {
          yellow: '#FFCB05',
          blue: '#3B5CA8',
          bg: '#f1f5f9',
          card: '#ffffff',
          border: '#e2e8f0',
          input: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
}

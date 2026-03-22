/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pkm: {
          yellow: '#FFCB05',
          blue: '#3B5CA8',
          dark: '#0f1117',
          card: '#1a1d27',
          border: '#2a2d3a',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tùy chỉnh thêm màu sắc hoặc font theo phong cách game/Duolingo nếu cần
      colors: {
        duo: {
          green: '#58cc02',
          'green-dark': '#46a302',
          blue: '#1cb0f6',
          'blue-dark': '#1899d6',
          yellow: '#ffc800',
          'yellow-dark': '#e5b400',
          red: '#ff4b4b',
          'red-dark': '#e54343',
        }
      }
    },
  },
  plugins: [],
}
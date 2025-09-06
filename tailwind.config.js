/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f7941e',
        secondary: '#e42c33',
        dark: '#1a1a1a',
      }
    },
  },
  plugins: [],
}
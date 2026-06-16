/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0088cc',
        secondary: '#31a24c',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

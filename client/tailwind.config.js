/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#1e1e1e',
        secondery : '#CAFF33',
        primarySupp : '#0f0f0f',
        seconderySupp : '#a7d918'
      }
    },
  },
  plugins: [],
}
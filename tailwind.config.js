/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'input-color': '#D9D9D9',
        'error-code': '#FFE6E6',
        'the-color': '#9747FF',
        'chart-co': '#FBFBFB',
        'suc-color': '#27F9554D',
        'suc-text': '#38954C',
        'inpro-co': '#D2B1FC',
        'inpro-text':'#9747FF',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(87.13deg, #9747FF 0%, #BF8FFD 100%)",
       
      }
    },
  },
  plugins: [],
}

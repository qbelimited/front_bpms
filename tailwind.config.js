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
        'the-color': '#9747FF'
      },
    },
  },
  plugins: [],
}

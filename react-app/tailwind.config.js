/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
      extend: {
        colors: {
          'A7A3FF': '#A7A3FF',
          "4D47C3" : "#4D47C3",
          "F0EFFF" : "#F0EFFF",
          "6359D8" : "#6359D8",
          "button" : "#7467F0",
          "bg" : "#fefefe",
          "bg-2" : "#fafafa"
        },
      },
  },
  plugins: [require('flowbite/plugin')],
}
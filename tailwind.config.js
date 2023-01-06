/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bakbak: ["Bakbak One", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        goblin: ["Goblin One", "sans-serif"],
      },
      colors: {
        myblue: "#315199",
        myblack: "#2F2E33",
        mygray: "#D5D6D2",
        mygray2: "#BCBABE",
        mypurple: "#6c7ac9",
        myred: "#FF4447"
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px"
      }
    },
  },
  plugins: [],
}

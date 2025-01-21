/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        myMarron: "#B65001",
        myYellow: "#FCBE22",
        myGray: "#DBDBDB",
        myWhite: "#FCFCFC",
        myBlack: "#131313",
      },
      backgroundImage: {
        myYellowLin: "linear-gradient(#FCBE22, #B65001)",
      },
    },
  },
  plugins: [],
};

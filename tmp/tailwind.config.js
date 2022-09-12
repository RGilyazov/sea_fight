/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      keyframes: {
        blur: {
          "0%": { filter: "blur(4px)", opacity: 0 },
          "100%": { filter: "blur(0)", opacity: 1 },
        },
      },
      animation: {
        "image-loading": "blur 2s linear",
        "image-loaded": "blur 0.5s linear",
      },
      boxShadow: {
        inner:
          "rgb(0 0 0 / 0.1) 3px 3px 6px 0px inset, rgb(0 0 0 / 0.1) -3px -3px 6px 0px inset",
        focus: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      },
    },
    fontFamily: {
      sans: ["PT Sans", "sans-serif"],
    },
  },
  plugins: [],
};

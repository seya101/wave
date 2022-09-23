/** @type {import('tailwindcss').Config} */

const { colors } = require("tailwindcss/colors")


module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "#efe8e0",
        color_1: "#E04BF5",
        color_2: "#BC28D1",
        color_3: "#fd7e50",
        gray: "#64748b",
        black: "#1e293b",
        debug: "#f87171"
      }
    },
  },
  plugins: [],
}

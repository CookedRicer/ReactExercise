/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  //if using 'daisyui' lib
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};

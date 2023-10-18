/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#0c4a6e",
        mainYellow: "#A9872D",
      },
    },
  },
  plugins: [],
};

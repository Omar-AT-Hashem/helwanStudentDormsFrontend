/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#0D375F",
        mainYellow: "#AC8601",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "rgb (220, 242, 241)", 

          secondary: "#7FC7D9",

          accent: "#facc15",

          neutral: "#facc15",

          "base-100": "#ffffff",

          info: "#16a34a",

          success: "#16a34a",

          warning: "#facc15",

          error: "#ff0000",

        },
      },
    ],
  },
  content: ["views/*.{html,js,ejs}", "views/**/*.{html,js,ejs}"],
  theme: {
    extend: {

    },
  },
  plugins: [require("daisyui")],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx}",
    "./src/views/*.{js,jsx}",
    "./src/*.{js,jsx,html}",
    "./src/components/sections/*.{js,jsx,html}",
    "./src/components/api/*.{js,jsx,html}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "image-light": "url('../public/images/day.jpg')",
        "image-dark": "url('../public/images/dark.jpg')",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  important: true,
  plugins: [
    require('@tailwindcss/forms')
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./imports/ui/**/*.{js,jsx,ts,tsx}",
    "./client/*.html",
  ],
  theme: {
    extend: {
      colors:{
        'Pur-back': '#292a47',
        'Pur-card': '#48487b',
        'Pur-lightCard': '#3C096C',
        'Pur-light': '#5A189A',
        'light-purple': '#7BCBF',
      }
    },
  },
  plugins: [],
}


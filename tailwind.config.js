const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#005a9c',
        'primary-dark': '#004d85',
        'primary-darker': '#102535',

        'secondary': '#d40000',
        'secondary-dark': '#aa0000',
      }
    },
    screens: {
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}

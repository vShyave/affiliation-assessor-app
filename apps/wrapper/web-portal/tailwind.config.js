const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      regular: ['Mulish-Regular'],
      medium: ['Mulish-medium'],
      bold: ['Mulish-bold']
    },
    extend: {
      colors: {
        primary: '#0074B6',
        secondary: '#1D8923',
        tertiary: '#FFF2E3'
      },
    },
  },
  plugins: [],
})

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
        primary: {
          100: '#B3CFE6',
          200: '#80AFD6',
          300: '#4D8EC5',
          400: '#2776B8',
          500: '#015EAC',
          600: '#0156A5',
          700: '#014C9B',
          800: '#014292',
          900: '#003182'
        },
        secondary: '#009A2B;',
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }, 
        error: {
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        }
      },
    },
  },
  plugins: [],
})

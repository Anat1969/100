/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-build': '#1D9E75',
        'green-bg': '#E1F5EE',
        'red-fail': '#A32D2D',
        'red-bg': '#FCEBEB',
        'orange-warn': '#BA7517',
        'orange-bg': '#FAEEDA',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ageplan-green': '#1D9E75',
        'ageplan-green-light': '#E1F5EE',
        'ageplan-red': '#A32D2D',
        'ageplan-red-light': '#FCEBEB',
        'ageplan-orange': '#BA7517',
        'ageplan-orange-light': '#FAEEDA',
      },
    },
  },
  plugins: [],
};

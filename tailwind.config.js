/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'primary-gray-50': '#F9FAFB',
        'primary-gray-200': '#F9FAFB',
        'primary-gray-300': '#D0D5DD',
        'primary-black': '#131313',
      },
    },
  },
  plugins: [],
}


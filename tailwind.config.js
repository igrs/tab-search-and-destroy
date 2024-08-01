/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'jordy-blue': {
          '50': '#f1f6fd',
          '100': '#e0ebf9',
          '200': '#c9ddf4',
          '300': '#a3c7ed',
          '400': '#8db7e7',
          '500': '#588bd9',
          '600': '#4371cd',
          '700': '#3a5ebb',
          '800': '#344e99',
          '900': '#2e437a',
          '950': '#202b4b',
        },
        'silver': {
          '50': '#f7f7f7',
          '100': '#f0f0f0',
          '200': '#e3e3e3',
          '300': '#d1d1d1',
          '400': '#bfbfbf',
          '500': '#aaaaaa',
          '600': '#969696',
          '700': '#818181',
          '800': '#6a6a6a',
          '900': '#585858',
          '950': '#333333',
        },
      },
    },
  },
  plugins: [],
}


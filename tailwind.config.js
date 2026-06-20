/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: '#B4F04A',
        purple: {
          DEFAULT: '#9D5CF4',
          light: '#A78BFA',
        },
        fig: '#1C1C2E',
        card: '#2C2C3E',
        ngray: '#9D9D9D',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}

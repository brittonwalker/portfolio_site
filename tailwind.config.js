/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    extend: {
      colors: {
        background: '#131313',
        primary: 'rgb(245, 238, 230)',
        hightlight: '#ED1C24',
      },
      fontSize: {
        medium: ['clamp(20px, 2vw, 34px)', 'inherit'],
      },
    },
  },
  plugins: [],
};

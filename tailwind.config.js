/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        hide: {
          '0%': { transform: 'translate(64px,0)' },
         ' 100%': { transform: 'translate(0,0)' }
        }
      },
      animation: {
        'edit-transition': 'hide 0.2s',
      },
      backgroundImage:{
        homeBackground: "url(../public/overlay.svg)"
      },
      zIndex: {
        "-1": "-1",
      },
      transformOrigin: {
        "0": "0%",
      },
      colors:{
        Lighter:'#EBD6FD',
        Light: '#B985F4',
        Main: '#7635dc',
        Dark: '#431A9E',
        Darker: '#200A69'
      }
    },
  },
  plugins: [],
}

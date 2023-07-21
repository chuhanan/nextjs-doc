const colors = require('./enki/styles/color')
const sizes = require('./enki/styles/size')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        md: '750px',
      },
      borderRadius: sizes.radius,
      spacing: sizes.spacing,
      colors,
      width: {
        13: '52px',
        unset: 'unset',
      },
      height: {
        13: '52px',
        unset: 'unset',
      },
      lineHeight: {
        12: '48px',
        13: '52px',
        unset: 'unset',
      },
      willChange: {
        'transform-width': 'transform,width',
      },
    },
  },
  plugins: [require('tailwindcss-safe-area')],
}

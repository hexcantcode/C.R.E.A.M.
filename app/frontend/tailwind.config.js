/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          100: '#1a1a1a',
          200: '#0d0d0d',
          300: '#000000',
        },
        'yellow': {
          100: '#FFD700',
          200: '#FFC700',
          300: '#FFB800',
        }
      },
    },
  },
  plugins: [],
}



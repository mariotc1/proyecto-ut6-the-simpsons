/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'simpsons': {
          'yellow': '#FAD400',
          'blue': '#1E90FF',
          'red': '#E74C3C',
          'orange': '#FF8C00',
          'dark-blue': '#0033A0',
          'light-yellow': '#FFF9E6',
        }
      },
      fontFamily: {
        'simpsons': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        simpsons: {
          "primary": "#FAD400",
          "primary-focus": "#E6C200",
          "primary-content": "#1A1A1A",
          "secondary": "#1E90FF",
          "secondary-focus": "#0066CC",
          "secondary-content": "#FFFFFF",
          "accent": "#FF8C00",
          "accent-focus": "#E67300",
          "accent-content": "#FFFFFF",
          "neutral": "#2D3748",
          "neutral-focus": "#1A202C",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFF9E6",
          "base-200": "#F5E6B3",
          "base-300": "#E6D200",
          "base-content": "#1A1A1A",
          "info": "#1E90FF",
          "success": "#48BB78",
          "warning": "#FF8C00",
          "error": "#E74C3C",
        },
      },
      "light",
      "dark",
    ],
  },
};

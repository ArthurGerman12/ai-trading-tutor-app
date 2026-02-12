/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', maxHeight: '0', padding: '0 1.25rem' },
          '100%': { opacity: '1', maxHeight: '500px', padding: '1.25rem' },
        }
      }
    },
  },
  plugins: [],
}
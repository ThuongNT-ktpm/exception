/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatHeart: {
          '0%': { opacity: '0.7', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-120vh) scale(1.3)' },
        },
        polaroidIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) rotate(0)' },
          '100%': { opacity: '1', transform: 'scale(1) var(--rotate)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float-heart': 'floatHeart linear forwards',
        polaroid: 'polaroidIn 0.5s ease-out forwards',
        'cursor-blink': 'blink 0.8s step-end infinite',
      }
    },
  },
  plugins: [],
}

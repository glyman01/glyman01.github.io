module.exports = {
  content: [
    "./index.html",
    "./partials/**/*.html",
    "./stylesheets/**/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue
        secondary: '#FBBF24', // Yellow
        accent: {
          DEFAULT: '#FF6C3C', // Example gradient start (orange)
          dark: '#FC3854', // Example gradient end (red)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
      },
    },
  },
  plugins: [],
}

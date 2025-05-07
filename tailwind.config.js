module.exports = {
  content: [
    "./index.html",
    "./partials/**/*.html",
    "./stylesheets/**/*.scss",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black
        secondary: '#FFFFFF', // White
        accent: {
          DEFAULT: '#FF6C3C', // Example gradient start (orange)
          dark: '#FC3854', // Example gradient end (red)
        },
      },
      // Add any additional customizations here
    },
  },
  plugins: [],
}

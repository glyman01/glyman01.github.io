 // tailwind.config.js
module.exports = {
	purge: [
	 './src/**/*.html',
	 './src/**/*.js',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Helvetica Neue', 'sans-serif'],
			serif: ['Arvo', 'serif'],
		},
		screens: {
		'xs': '480',
		'sm': '767',
		'md': '960',
		'lg': '1200',
		'xl': '1440',
		'2xl': '1536px',
		},
		extend: {},
	},
	variants: {},
	plugins: [],
}
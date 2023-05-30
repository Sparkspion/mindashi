/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				kasaijin_light: {
					primary: '#ff3c3c',
					secondary: '#4ca8ff',
					accent: '#ffcf57',
					neutral: '#191D24',
					'base-100': '#2A303C',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	}
};

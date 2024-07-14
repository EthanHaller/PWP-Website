/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Montserrat", "ui-sans-serif", "system-ui"],
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#224098",
					secondary: "#ef6c34",
					accent: "#37cbde",
					neutral: "#f3f4f6",
					"base-100": "#ffffff",
					info: "#2094f3",
					success: "#22c55e",
					warning: "#f59e0b",
					error: "#ef4444",
					fontFamily: {
						sans: ["Montserrat", "ui-sans-serif", "system-ui"],
					},
				},
			},
		],
	},
}

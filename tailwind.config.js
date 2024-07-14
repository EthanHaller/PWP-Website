/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#224098",
					secondary: "#ef6c34",
					accent: "#37cbde",
					neutral: "#3d4451",
					"base-100": "#ffffff",
					info: "#2094f3",
					success: "#22c55e",
					warning: "#f59e0b",
					error: "#ef4444",
				},
			},
		],
	},
}

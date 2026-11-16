import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ command, mode }) => {
	const production = command === "build" && process.env.NETLIFY === "true" && process.env.CONTEXT === "production"
	const envDir = path.resolve(__dirname, "qa.local")
	if (!production) {
		const env = loadEnv(mode, envDir)
		if (env.VITE_projectId !== "pwp-website-qa") {
			throw new Error("Local and QA builds require the pwp-website-qa Firebase configuration.")
		}
		if (!env.VITE_BACKEND_URL) {
			throw new Error("Local and QA builds require VITE_BACKEND_URL.")
		}
		const api = new URL(env.VITE_BACKEND_URL)
		const productionDomains = ["uvapwp.com", "uvapwp.netlify.app", "uvapwpbackend.netlify.app"]
		if (productionDomains.some((domain) => api.hostname === domain || api.hostname.endsWith(`.${domain}`))) {
			throw new Error("Local and QA builds require a QA API URL.")
		}
		if (env.VITE_EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_SERVICE_ID || env.VITE_EMAILJS_TEMPLATE_ID) {
			throw new Error("EmailJS settings must be empty in local and QA builds.")
		}
	}
	return {
		envDir: production ? __dirname : envDir,
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},
	}
})

const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")

const standalone = require.main === module
const qa = process.env.PWP_ENV === "qa"

if (standalone && !qa) {
	throw new Error("Start the local API with the QA environment file.")
}
if (!standalone && (qa || (process.env.CONTEXT && process.env.CONTEXT !== "production"))) {
	throw new Error("Hosted QA with local credentials must run as a standalone API.")
}

const membersRouter = require("../../src/routes/members")
const projectsRouter = require("../../src/routes/projects")
const partnersRouter = require("../../src/routes/partners")
const countriesRouter = require("../../src/routes/countries")
const recruitmentRouter = require("../../src/routes/recruitment")
const alumniRouter = require("../../src/routes/alumni")
const adminRouter = require("../../src/routes/admin")

const app = express()

if (qa) {
	const { DocumentReference } = require("firebase-admin/firestore")
	app.set("json replacer", (_key, value) => value instanceof DocumentReference ? value.path : value)
	app.use((req, res, next) => {
		const origin = req.get("origin")
		if (req.get("host") !== "127.0.0.1:8888" || (origin && origin !== "http://127.0.0.1:5173")) {
			return res.sendStatus(403)
		}
		next()
	})
}

app.use(
	cors({
		origin: "*",
		credentials: false,
		methods: "GET,HEAD,OPTIONS,POST,PUT,DELETE",
		allowedHeaders: "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Access-Control-Allow-Origin,Authorization",
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/.netlify/functions/api/members", membersRouter)
app.use("/.netlify/functions/api/projects", projectsRouter)
app.use("/.netlify/functions/api/partners", partnersRouter)
app.use("/.netlify/functions/api/countries", countriesRouter)
app.use("/.netlify/functions/api/recruitment", recruitmentRouter)
app.use("/.netlify/functions/api/alumni", alumniRouter)
app.use("/.netlify/functions/api/admin", adminRouter)

exports.handler = serverless(app)

if (standalone) {
	const { db, admin } = require("./firebase-config")
	async function startLocalApi() {
		try {
			await admin.app().options.credential.getAccessToken()
		} catch (error) {
			throw new Error("Google Application Default Credentials are required for hosted QA. Run gcloud auth application-default login.", { cause: error })
		}
		await db.doc("recruitment/generalInfo").get()
		app.listen(8888, "127.0.0.1", () => console.log("QA API listening at http://127.0.0.1:8888"))
	}
	startLocalApi().catch((error) => {
		console.error(`Could not start the local QA API: ${error.message}`)
		process.exitCode = 1
	})
}

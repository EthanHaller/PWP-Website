import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Members from "./pages/Members"
import Recruitment from "./pages/Recruitment"
import Contact from "./pages/Contact"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/members",
		element: <Members />,
	},
	{
		path: "/recruitment",
		element: <Recruitment />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

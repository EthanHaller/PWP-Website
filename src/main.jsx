import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Members from "./pages/Members"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/members",
		element: <Members />,
	},
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

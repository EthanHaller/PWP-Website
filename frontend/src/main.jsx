import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Recruitment from "./pages/Recruitment"
import Members from "./pages/Members"
import Contact from "./pages/Contact"
import Project from "./pages/Project"
import Layout from "./components/Layout"
import "./index.css"

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/portfolio",
				element: <Portfolio />,
			},
			{
				path: "/portfolio/:id",
				element: <Project />,
			},
			{
				path: "/recruitment",
				element: <Recruitment />,
			},
			{
				path: "/members",
				element: <Members />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)

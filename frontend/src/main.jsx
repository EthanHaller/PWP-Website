import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)

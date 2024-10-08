import React from "react"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import Error from "../components/Error"

const fetchProjects = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects`)
	return response.data
}

const Portfolio = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	})

	if (isError) {
		return <Error />
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Portfolio</h1>
			<div className="container mx-auto p-4 mb-8">
				<h1 className="text-3xl lg:text-5xl font-bold mt-32 mb-8 text-primary">Check out our Projects.</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
					{isLoading
						? Array.from({ length: 6 }).map((_, index) => (
								<Card key={index} className="relative overflow-hidden group rounded-none border-none shadow-none">
									<Skeleton className="w-full h-auto aspect-video bg-foreground/10" />
									<div className="flex flex-col justify-between mt-2 mb-8 lg:hidden">
										<Skeleton className="w-3/4 h-6 mb-2" />
										<Skeleton className="w-1/2 h-10" />
									</div>
								</Card>
						  ))
						: data.projects
								.sort((a, b) => b.date.seconds - a.date.seconds)
								.map((project) => (
									<Card key={project.id} className="relative overflow-hidden group rounded-none border-none shadow-none">
										<img src={project.coverImageUrl} alt={project.title} className="w-full h-auto object-cover aspect-video" />
										<div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center transform lg:-translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-in-out hidden lg:flex">
											<h3 className="text-2xl mb-4 font-bold">{project.title}</h3>
											<a href={project.presentationUrl} target="_blank">
												<Button className="bg-primary text-lg px-6 py-3">View More</Button>
											</a>
										</div>
										<div className="flex justify-between items-center mt-2 mb-8 lg:hidden">
											<h3 className="text-xl font-bold">{project.title}</h3>
											<a href={project.presentationUrl} target="_blank">
												<Button className="bg-primary text-lg px-6 py-3">View More</Button>
											</a>
										</div>
									</Card>
								))}
				</div>
			</div>
		</>
	)
}

export default Portfolio

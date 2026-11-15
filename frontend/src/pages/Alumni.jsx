import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { Skeleton } from "../components/ui/skeleton"
import { FaLinkedinIn } from "react-icons/fa6"
import Error from "../components/Error"

const fetchAlumni = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alumni`)
	return response.data
}

const fetchCompanies = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alumni/companies`)
	return response.data
}

const Alumni = () => {
	const { data: alumniData, isLoading: alumniLoading, isError: alumniError } = useQuery({ queryKey: ["alumni"], queryFn: fetchAlumni })
	const { data: companiesData, isLoading: companiesLoading, isError: companiesError } = useQuery({ queryKey: ["companies"], queryFn: fetchCompanies })

	if (alumniError || companiesError) {
		return <Error />
	}

	return (
		<>
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Alumni</h1>
			<div className="container mx-auto p-4 mb-8">
				<h1 className="text-5xl font-bold mt-32 mb-8 text-primary">Alumni.</h1>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<ScrollArea className="rounded-md">
						{alumniLoading
							? Array.from({ length: 8 }).map((_, index) => (
									<div key={index} className="px-4 py-2">
										<div className="flex justify-between items-center">
											<Skeleton className="h-6 w-32" />
											<Skeleton className="h-6 w-8" />
										</div>
										<Separator className="my-2" />
									</div>
							  ))
							: alumniData
									.sort((a, b) => {
										const lastNameA = a.name.split(" ").pop().toLowerCase()
										const lastNameB = b.name.split(" ").pop().toLowerCase()
										const lastNameComparison = lastNameA.localeCompare(lastNameB)
										if (lastNameComparison !== 0) return lastNameComparison

										const firstNameA = a.name.split(" ")[0].toLowerCase()
										const firstNameB = b.name.split(" ")[0].toLowerCase()
										return firstNameA.localeCompare(firstNameB)
									})
									.map((alumni) => (
										<div key={alumni.id} className="px-4 py-2">
											<div className="flex justify-between items-center text-primary">
												<span>{alumni.name}</span>
												{alumni.linkedin && (
													<a
														href={alumni.linkedin}
														className="hover:text-accent-foreground text-primary"
														target="_blank"
														rel="noopener noreferrer"
													>
														<FaLinkedinIn size={24} />
													</a>
												)}
											</div>
											<Separator className="my-2" />
										</div>
									))}
					</ScrollArea>

					<div className="lg:col-span-2 flex flex-wrap justify-center items-center gap-8 mx-auto bg-white p-12">
						{companiesLoading
							? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-32 w-32" />)
							: companiesData
									.sort((a, b) => {
										return a.name.localeCompare(b.name)
									})
									.map((company) => (
										<div key={company.id} className="h-32 max-w-80 px-4">
											<img src={company.imageUrl} alt={`${company.name} Logo`} className="h-full w-full object-contain" />
										</div>
									))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Alumni

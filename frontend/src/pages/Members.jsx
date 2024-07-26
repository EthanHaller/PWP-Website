import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MemberCard from "../components/MemberCard"
import { SkeletonCard } from "../components/SkeletonCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchMembers = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/members`)
	return response.data
}

const Members = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["members"],
		queryFn: fetchMembers,
	})

	if (isError) {
		return <div>Error: {error.message}</div>
	}

	return (
		<>
			<Navbar />
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Members</h1>
			<div className="container mx-auto p-4 mb-8">
				<h1 className="text-5xl font-bold text-center mt-16 mb-4">Members</h1>
				<h2 className="text-xl font-semibold text-center mb-2">Executive Team</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-auto align-items-start justify-items-center">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.exec
								.sort((a, b) => (a.relativeOrder ?? 10) - (b.relativeOrder ?? 10))
								.map((member) => (
									<MemberCard
										key={member.id}
										headshotUrl={member.headshotUrl}
										name={member.name}
										execRole={member.execRole}
										about={member.about}
									/>
								))}
				</div>
				<h2 className="text-xl font-semibold text-center mt-8 mb-2">General Body</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-auto align-items-start justify-items-center">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.nonExec
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((member) => <MemberCard key={member.id} headshotUrl={member.headshotUrl} name={member.name} about={member.about} />)}
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Members

import React from "react"
import Navbar from "../components/Navbar"
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
			<div className="container mx-auto p-4">
				<h1 className="text-5xl font-bold text-center mt-16 mb-4">Members</h1>
				<h2 className="text-xl font-semibold text-center mb-2">Executive Team</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto align-items-start justify-items-center">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.exec.map((member) => (
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
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto align-items-start justify-items-center">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
						: data.nonExec.map((member) => <MemberCard key={member.id} headshotUrl={member.headshotUrl} name={member.name} about={member.about} />)}
				</div>
			</div>
		</>
	)
}

export default Members

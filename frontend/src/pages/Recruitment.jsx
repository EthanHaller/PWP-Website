import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaStar, FaTools, FaGlobe, FaGraduationCap } from "react-icons/fa"
import { Card, CardHeader, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

const Recruitment = () => {
	return (
		<>
			<Navbar />
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Recruitment</h1>
			<div className="w-full h-[80vh] relative">
				<div className="absolute inset-0 bg-background/90 z-10" />
				<div className="bg-[url('https://cdn.britannica.com/06/154006-050-3D5B38C6/Pavilions-Lawn-University-of-Virginia-Charlottesville.jpg')] bg-cover bg-center h-full" />
				<div className="h-full absolute container mx-auto px-4 md:px-6 inset-0 z-20 flex items-center">
					<h2 className="xl:text-5xl xl:leading-[6rem] lg:text-4xl lg:leading-[5rem] text-3xl leading-[4rem] p-4 pt-16 uppercase">
						How can you <span className="font-bold highlight">invest</span> in the <span className="font-bold highlight">creative capacity</span> of{" "}
						<span className="font-bold highlight">entrepreneurs</span> solving our world's most{" "}
						<span className="font-bold highlight">pressing social issues</span> without sacrificing{" "}
						<span className="italic">market rate returns</span>?
					</h2>
				</div>
			</div>
			<div className="container mx-auto px-4 md:px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="py-6 px-2 bg-white shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaStar size={40} className="text-primary" />
							<h3 className="text-xl font-bold">About Us</h3>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700">
								At Profit with Purpose, we build a community of undergraduate students who can understand, identify, and begin careers in impact
								investing and consulting.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-white shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaTools size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Our Approach</h3>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700">
								We do this through our hands-on training curriculum, professional mentors, and pro-bono consulting for domestic and
								international companies that embody ESG standards.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-white shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaGlobe size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Our Mission</h3>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700">
								We're building an ecosystem where students from any background can learn, up-skill, and access opportunities in impact
								investing.
							</p>
						</CardContent>
					</Card>

					<Card className="py-6 px-2 bg-white shadow-md rounded-md">
						<CardHeader className="flex items-center mb-4">
							<FaGraduationCap size={40} className="text-primary" />
							<h3 className="text-xl font-bold">Who We Recruit</h3>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700">
								We recruit students from all years, majors, and backgrounds to facilitate consulting projects and investment strategies from
								unique perspectives.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex flex-col items-center mt-8 mb-16">
				<h2 className="font-bold text-4xl mb-8">Interested in Joining?</h2>
				<Button>
					<a
						className="text-xl px-8"
						href="https://docs.google.com/forms/d/e/1FAIpQLScpZUqi7rGQbq9UFfS1Abc8jkhdpKs0mws9XkzkfRahAD1iYw/viewform?usp=sf_link"
					>
						Fill out our interest form!
					</a>
				</Button>
			</div>
			<Footer />
		</>
	)
}

export default Recruitment

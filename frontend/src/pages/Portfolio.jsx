import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aspect_ratio_-_16x9.svg/1200px-Aspect_ratio_-_16x9.svg.png"

const images = Array(12).fill(placeholderImage)

const Portfolio = () => {
	return (
		<>
			<Navbar />
			<h1 className="text-primary font-bold md:hidden absolute top-8 right-8 z-50">Portfolio</h1>
			<div className="container mx-auto px-4 md:px-6 pt-32 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
					{images.map((image, index) => (
						<Card key={index} className="relative overflow-hidden group">
							<img src={image} alt={`Gallery ${index}`} className="w-full h-auto object-cover aspect-video" />
							<div className="absolute inset-0 bg-muted/90 flex flex-col items-center justify-center transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
								<h3 className="text-2xl mb-4">Title {index + 1}</h3>
								<Button className="bg-primary hover:bg-primary-dark">View More</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Portfolio

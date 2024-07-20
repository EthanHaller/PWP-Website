import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import LogoSlider from "../components/LogoSlider"
import Map from "../components/Map"
import Footer from "../components/Footer"

const Home = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<LogoSlider />
			<div className="min-h-screen">
				<div className="max-w-screen-lg mx-auto relative">
					<Map />
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Home

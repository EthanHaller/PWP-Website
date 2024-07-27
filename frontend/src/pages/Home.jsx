import React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Statistics from "../components/Statistics"
import LogoSlider from "../components/LogoSlider"
import Map from "../components/Map"
import Footer from "../components/Footer"

const Home = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<Statistics />
			<LogoSlider />
			<Map />
			<Footer />
		</>
	)
}

export default Home

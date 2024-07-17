import React from "react"
import logo from "/pwp.svg"

const Hero = () => {
	return (
		<div
			className="hero min-h-screen"
			style={{
				backgroundImage: "url(https://cdn.britannica.com/06/154006-050-3D5B38C6/Pavilions-Lawn-University-of-Virginia-Charlottesville.jpg)",
			}}
		>
			<div className="hero-overlay bg-opacity-75 backdrop-blur-sm"></div>
			<div className="hero-content flex-col lg:flex-row">
			<img src={logo} className="max-w-sm" />
				<div>
					<h1 className="text-5xl font-bold text-secondary">PROFIT WITH PURPOSE</h1>
					<p className="py-6 max-w-screen-lg">
					Profit with purpose is a student run organization focused on impact investing. We meet weekly to learn about and discuss fundamentals of
					impact investing and apply them in the context of real impact-based startup companies.
					</p>
					<button className="btn btn-primary">Get Started</button>
				</div>
			</div>
		</div>
	)
}

export default Hero

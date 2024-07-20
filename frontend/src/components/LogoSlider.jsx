import React from "react"

const logos = [
	"images/ethiopian_delights.png",
	"images/junk_labz.jpg",
	"images/kava.png",
	"images/muyu_milq.jpg",
	"images/nature_buff.jpg",
	"images/sfs.png",
	"images/tofali_zetu.png",
	"images/toloma.jpg",
	"images/twende.png",
	"images/we_planet.png",
	"images/yellow_red.png",
]

const duplicatedLogos = [...logos, ...logos]

const LogoSlider = () => {
	return (
		<div className="relative overflow-hidden container mx-auto">
			<div className="whitespace-nowrap scroll">
				{duplicatedLogos.map((logo, index) => (
					<div key={index} className="inline-block px-6">
						<img src={logo} alt={`Logo ${index + 1}`} className="h-32 object-contain" />
					</div>
				))}
			</div>
			<div className="absolute top-0 left-0 w-2/12 h-full blur-effect"></div>
			<div className="absolute top-0 right-0 w-2/12 h-full blur-effect"></div>
		</div>
	)
}

export default LogoSlider

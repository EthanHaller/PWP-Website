import React from "react"
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps"

const geoUrl = "/countries.json"

const Map = () => {
	const [tooltipContent, setTooltipContent] = React.useState("")
	const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = React.useState(false)

	const handleMouseEnter = (event, geo) => {
		if (geo.properties.isPreviousClient) {
			const { name } = geo.properties
			setTooltipContent(name)
			setTooltipPosition({ x: event.clientX, y: event.clientY })
			setIsHovered(true)
		}
	}

	const handleMouseMove = (event) => {
		setTooltipPosition({ x: event.clientX, y: event.clientY })
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		setTooltipContent("")
	}

	return (
		<>
			<div onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className="relative">
				<ComposableMap
					projectionConfig={{
						rotate: [-10, 0, 0],
						scale: 147,
					}}
				>
					<Sphere stroke="#d1d5db" strokeWidth={0.5} />
					<Graticule stroke="#d1d5db" strokeWidth={0.5} />
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onMouseEnter={(event) => handleMouseEnter(event, geo)}
									onMouseLeave={handleMouseLeave}
									fill={geo.properties.isPreviousClient ? "#224098" : "#a3b4d8"}
									stroke=""
									strokeWidth={0.5}
									style={{
										default: {
											outline: "none",
										},
										hover: {
											outline: "none",
										},
										pressed: {
											outline: "none",
										},
									}}
								/>
							))
						}
					</Geographies>
				</ComposableMap>
				{isHovered && tooltipContent && (
					<span
						data-tip={tooltipContent}
						className="tooltip tooltip-open tooltip-accent fixed font-bold rounded-full"
						style={{
							left: `${tooltipPosition.x}px`,
							top: `${tooltipPosition.y}px`,
							transform: "translate(-50%, -100%)",
							pointerEvents: "none",
						}}
					></span>
				)}
			</div>
		</>
	)
}

export default Map

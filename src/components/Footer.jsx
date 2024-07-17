import React from "react"
import logo from "/pwp.svg"
import { FaSquareInstagram } from "react-icons/fa6"
import { FaSquareFacebook } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6"

const Footer = () => {
	return (
		<>
			<footer className="footer bg-neutral text-neutral-content items-center p-8">
				<aside className="grid-flow-col items-center">
					<div className="w-24">
						<img src={logo} />
					</div>
					<p className="px-4">Copyright © {new Date().getFullYear()} - All right reserved</p>
				</aside>
				<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
					<a href="https://www.instagram.com/pwpatuva/" target="_blank">
						<FaSquareInstagram size={40} className="text-primary" />
					</a>
					<a href="https://www.facebook.com/pwpatuva/" target="_blank">
						<FaSquareFacebook size={40} className="text-primary" />
					</a>
					<a href="https://www.linkedin.com/company/profit-with-purpose-at-uva/" target="_blank">
						<FaLinkedin size={40} className="text-primary" />
					</a>
				</nav>
			</footer>
		</>
	)
}

export default Footer

import React from "react"
import { NavLink } from "react-router-dom"
import logo from "/pwp.svg"

const Navbar = () => {
	return (
		<nav className="navbar absolute py-3 px-8 z-50">
			<div className="avatar">
				<div className="w-20 rounded">
					<NavLink
						to="/"
						className={({ isActive }) => {
							return isActive ? "hidden" : ""
						}}
					>
						<img src={logo} />
					</NavLink>
				</div>
			</div>
			<div className="navbar-end ml-auto">
				<div role="tablist" className="ml-auto tabs tabs-bordered font-bold">
					<NavLink
						to="/members"
						role="tab"
						className={({ isActive }) => {
							return (isActive ? "tab-active" : "") + " tab"
						}}
					>
						Members
					</NavLink>
					<NavLink
						to="/recruitment"
						role="tab"
						className={({ isActive }) => {
							return (isActive ? "tab-active" : "") + " tab"
						}}
					>
						Recruitment
					</NavLink>
					<NavLink
						to="/contact"
						role="tab"
						className={({ isActive }) => {
							return (isActive ? "tab-active" : "") + " tab"
						}}
					>
						Contact
					</NavLink>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

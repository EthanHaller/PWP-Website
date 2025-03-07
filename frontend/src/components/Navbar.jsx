import React, { useState } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { IoMenu } from "react-icons/io5"

const navItems = [
	{ path: "/portfolio", label: "Portfolio" },
	{ path: "/recruitment", label: "Recruitment" },
	{ path: "/members", label: "Members" },
	{ path: "/alumni", label: "Alumni" },
	{ path: "/contact", label: "Contact" },
]

export default function Navbar() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const openSheet = () => setIsSheetOpen(true)
	const closeSheet = () => setIsSheetOpen(false)

	return (
		<header className="absolute flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-50">
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden text-primary" onClick={openSheet}>
						<IoMenu size={32} className="text-primary" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetDescription></SheetDescription>
					<NavLink to="/" onClick={closeSheet}>
						<img src="/pwp.svg" className="h-12" />
						<span className="sr-only">Profit with Purpose</span>
						<SheetTitle>Profit with Purpose</SheetTitle>
					</NavLink>
					<div className="grid gap-2 py-6">
						<NavLink to="/" className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
							Home
						</NavLink>
						{navItems.map((item) => (
							<NavLink key={item.path} to={item.path} className="flex w-full items-center py-2 text-lg font-semibold" onClick={closeSheet}>
								{item.label}
							</NavLink>
						))}
					</div>
				</SheetContent>
			</Sheet>
			<NavLink to="/" className="mr-6 hidden md:flex items-center">
				<img src="/pwp.svg" className="h-14" />
				<span className="sr-only">Profit with Purpose</span>
			</NavLink>
			<NavigationMenu className="hidden w-full md:flex md:justify-end">
				<NavigationMenuList>
					{navItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								isActive
									? "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-bold transition-border border-b-2 border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
									: "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-border border-b-2 border-black/20 hover:border-primary hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
							}
						>
							{item.label}
						</NavLink>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Z3AvsEt4DA4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"

export default function Navbar() {
	return (
		<header className="absolute flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-50">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="lg:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Link to="/">
						<img src="pwp.svg" className="h-12" />
						<span className="sr-only">Profit with Purpose</span>
					</Link>
					<div className="grid gap-2 py-6">
						<Link to="/" className="flex w-full items-center py-2 text-lg font-semibold">
							Home
						</Link>
						<Link to="/recruitment" className="flex w-full items-center py-2 text-lg font-semibold">
							Recruitment
						</Link>
						<Link to="/members" className="flex w-full items-center py-2 text-lg font-semibold">
							Members
						</Link>
						<Link to="/contact" className="flex w-full items-center py-2 text-lg font-semibold">
							Contact
						</Link>
					</div>
				</SheetContent>
			</Sheet>
			<Link to="/" className="mr-6 hidden lg:flex">
				<img src="pwp.svg" className="h-12" />
				<span className="sr-only">Profit with Purpose</span>
			</Link>
			<NavigationMenu className="hidden w-full lg:flex lg:justify-end">
				<NavigationMenuList>
					<NavigationMenuLink asChild>
						<Link
							to="/"
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Home
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link
							to="/recruitment"
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Recruitment
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link
							to="/members"
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Members
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link
							to='/contact'
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Contact
						</Link>
					</NavigationMenuLink>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

function MenuIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	)
}

function XIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	)
}

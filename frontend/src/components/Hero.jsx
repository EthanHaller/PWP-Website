/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OTTV5vbR4tP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button } from "./ui/button"

export default function Component() {
	const scrollToAbout = () => {
		document.getElementById("about").scrollIntoView({ behavior: "smooth" })
	}

	return (
		<section className="w-full h-[80vh] relative">
			<div className="container mx-auto px-4 md:px-6 space-y-6 absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-x-8">
				<div className="w-[256px] h-[256px] lg:w-auto lg:h-5/6">
					<img src="/pwp.svg" alt="PWP Logo" width={256} height={256} className="w-full h-full object-contain" />
				</div>
				<div>
					<h1 className="uppercase mb-4 text-4xl lg:text-6xl font-bold text-primary">Profit with Purpose</h1>
					<p className="text-lg md:text-xl">
						We strive to deliver impact-based consulting and investment to early-stage ESG startups from diverse perspectives.
					</p>
					<Button className="mt-4" variant="secondary" onClick={() => scrollToAbout()}>
						About us
					</Button>
				</div>
			</div>
		</section>
	)
}

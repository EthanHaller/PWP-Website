/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OTTV5vbR4tP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Component() {
	return (
		<section className="w-full h-[70vh] relative">
			<div className="absolute inset-0 bg-background/90 z-10" />
			<div className="bg-[url(https://cdn.britannica.com/06/154006-050-3D5B38C6/Pavilions-Lawn-University-of-Virginia-Charlottesville.jpg)] bg-cover bg-center h-full" />
			<div className="container max-w-6xl mx-auto px-4 md:px-6 space-y-6 absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-x-8">
				<img src="/pwp.svg" className="h-64 lg:h-96" />
				<div>
					<h1 className="text-4xl md:text-6xl font-bold text-primary">Profit with Purpose</h1>
					<p className="text-lg md:text-xl">
						Profit with purpose is a student run organization focused on impact investing. We meet weekly to learn about and discuss fundamentals of
						impact investing and apply them in the context of real impact-based startup companies.
					</p>
				</div>
			</div>
		</section>
	)
}

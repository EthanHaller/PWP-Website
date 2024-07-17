import React, { useState } from "react"
import Navbar from "../components/Navbar"

const ContactForm = () => {
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})

	const [formErrors, setFormErrors] = useState({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}

	const validate = () => {
		let errors = {}
		if (!formValues.name) errors.name = true
		if (!formValues.email) errors.email = true
		if (!formValues.subject) errors.subject = true
		if (!formValues.message) errors.message = true
		return errors
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setFormErrors(validate())
		setIsSubmitted(true)
	}

	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center min-h-screen">
				<div className="card w-full max-w-lg shadow-lg bg-white p-6 rounded-lg">
					<h1 className="text-2xl font-bold mb-4">Get in Touch</h1>
					<form onSubmit={handleSubmit}>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Name*</span>
								{formErrors.name && <span className="label-text-alt text-error">Required</span>}
							</div>
							<input
								type="name"
								name="name"
								placeholder="Name"
								className={`input input-bordered w-full ${formErrors.name && "input-error"}`}
								value={formValues.name}
								onChange={handleChange}
							/>
						</label>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Email*</span>
								{formErrors.email && <span className="label-text-alt text-error">Required</span>}
							</div>
							<input
								type="email"
								name="email"
								placeholder="Email"
								className={`input input-bordered w-full ${formErrors.email && "input-error"}`}
								value={formValues.email}
								onChange={handleChange}
							/>
						</label>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Subject*</span>
								{formErrors.subject && <span className="label-text-alt text-error">Required</span>}
							</div>
							<input
								type="subject"
								name="subject"
								placeholder="Subject"
								className={`input input-bordered w-full ${formErrors.subject && "input-error"}`}
								value={formValues.subject}
								onChange={handleChange}
							/>
						</label>
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Message*</span>
								{formErrors.message && <span className="label-text-alt text-error">Required</span>}
							</div>
							<input
								type="message"
								name="message"
								placeholder="Message"
								className={`input input-bordered w-full ${formErrors.message && "input-error"}`}
								value={formValues.message}
								onChange={handleChange}
							/>
						</label>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary w-full">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default ContactForm

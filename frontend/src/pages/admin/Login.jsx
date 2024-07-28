import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/admin/dashboard")
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<div className="login-container">
			<h2>Admin Login</h2>
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login

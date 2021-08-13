import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import getUser from '../helpers/auth'

const Login = () => {
	Axios.defaults.withCredentials = true
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [loginStatus, setLoginStatus] = useState('')

	const login = (e) => {
		e.preventDefault()

		Axios.post('http://localhost:3001/api/login', { email, password }).then(
			(response) => {
				if (response.data.message) {
					setLoginStatus(response.data.message)
				} else {
					setLoginStatus(response.data.email)
				}
			}
		)
	}

	const register = (e) => {
		e.preventDefault()
		console.log(email)
		console.log(password)

		Axios.post('http://localhost:3001/api/register', { email, password }).then(
			(response) => console.log('response :>> ', response)
		)

		setEmail('')
		setPassword('')
	}

	const logout = () => {
		Axios.post('http://localhost:3001/api/logout').then((response) => {
			if (response.data.logout) {
				console.log('user logout with success')
			}
		})
	}

	useEffect(() => {
		getUser().then((response) => {
			if (response.data.logged) {
				setLoginStatus(response.data.user.email)
			}
		})
	}, [])
	return (
		<div>
			<form
				onSubmit={(e) => register(e)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '50%',
					margin: '2rem',
				}}
			>
				<input
					type='text'
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='text'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>Register</button>
			</form>
			<form
				onSubmit={(e) => login(e)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '50%',
					margin: '2rem',
				}}
			>
				<input
					type='text'
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='text'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>Login</button>
			</form>

			<h1>{loginStatus}</h1>
			<button onClick={logout}>LogOut</button>
		</div>
	)
}

export default Login

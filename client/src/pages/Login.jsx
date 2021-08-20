import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import getUser from '../helpers/auth'
import { authAxios } from '../helpers/auth-axios'
import { loginUser, logoutUser } from '../redux/user/userActions'

const Login = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [loginStatus, setLoginStatus] = useState('')

	const dispatch = useDispatch()

	const login = (e) => {
		e.preventDefault()

		authAxios.post('/login', { email, password }).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message)
			} else {
				dispatch(loginUser(response.data))
				setLoginStatus(response.data.email)
				const {
					history,
					location: { state },
				} = props
				if (state && state.next) {
					return history.push(state.next)
				}
				history.push('/')
			}
		})
	}

	const register = (e) => {
		e.preventDefault()
		console.log(email)
		console.log(password)

		authAxios
			.post('/register', { email, password })
			.then((response) => console.log('response :>> ', response))

		setEmail('')
		setPassword('')
	}

	const logout = () => {
		authAxios.post('/logout').then((response) => {
			if (response.data.logout) {
				dispatch(logoutUser({ logged: false, user: {} }))
				console.log('user logout with success')
				setLoginStatus('')
				const { history } = props
				history.push('/')
			}
		})
	}

	useEffect(() => {
		console.log(props.location)
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

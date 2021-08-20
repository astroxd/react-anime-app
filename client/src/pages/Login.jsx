import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authAxios } from '../helpers/auth-axios'
import { loginUser, logoutUser } from '../redux/user/userActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

const Login = (props) => {
	const [loginStatus, setLoginStatus] = useState('')

	const dispatch = useDispatch()

	const login = (data) => {
		const { email, password } = data

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

	const schema = yup.object().shape({
		username: yup.string().required('custom message for username'),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(15).required(),
		confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	return (
		<div
			style={{
				backgroundColor: 'blue',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1 style={{ margin: '3rem 0' }}>Login Page</h1>
			<form onSubmit={handleSubmit(login)}>
				<input
					type='text'
					name='username'
					placeholder='username'
					{...register('username')}
				/>
				<p>{errors.username?.message}</p>
				<input
					type='text'
					name='email'
					placeholder='email'
					{...register('email')}
				/>
				<p>{errors.email?.message}</p>
				<input
					type='text'
					name='password'
					placeholder='password'
					{...register('password')}
				/>
				<p>{errors.password?.message}</p>
				<input
					type='text'
					name='confirmPassword'
					placeholder='Confirm password'
					{...register('confirmPassword')}
				/>
				<p>{errors.confirmPassword && 'Password have to match'}</p>
				<input type='submit' />
			</form>
			<h1 style={{ margin: '1rem' }}>{loginStatus}</h1>
			<button onClick={logout}>Logout</button>
			<p>
				{"Don't have an account?"}
				<Link
					to={{
						pathname: '/register',
						state: { next: props.location?.state?.next },
					}}
					style={{ color: 'white' }}
				>
					{'Create here'}
				</Link>
			</p>
		</div>
		// <div>
		// 	<form
		// 		onSubmit={(e) => register(e)}
		// 		style={{
		// 			display: 'flex',
		// 			flexDirection: 'column',
		// 			width: '50%',
		// 			margin: '2rem',
		// 		}}
		// 	>
		// 		<input
		// 			type='text'
		// 			placeholder='email'
		// 			onChange={(e) => setEmail(e.target.value)}
		// 		/>
		// 		<input
		// 			type='text'
		// 			placeholder='password'
		// 			onChange={(e) => setPassword(e.target.value)}
		// 		/>
		// 		<button>Register</button>
		// 	</form>
		// 	<form
		// 		onSubmit={(e) => login(e)}
		// 		style={{
		// 			display: 'flex',
		// 			flexDirection: 'column',
		// 			width: '50%',
		// 			margin: '2rem',
		// 		}}
		// 	>
		// 		<input
		// 			type='text'
		// 			placeholder='email'
		// 			onChange={(e) => setEmail(e.target.value)}
		// 		/>
		// 		<input
		// 			type='text'
		// 			placeholder='password'
		// 			onChange={(e) => setPassword(e.target.value)}
		// 		/>
		// 		<button>Login</button>
		// 	</form>

		// 	<h1>{loginStatus}</h1>
		// 	<button onClick={logout}>LogOut</button>
		// </div>
	)
}

export default Login

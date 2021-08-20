import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { authAxios } from '../helpers/auth-axios'
import { loginUser } from '../redux/user/userActions'

const Register = (props) => {
	const dispatch = useDispatch()
	const registerUser = (data) => {
		const { email, password } = data

		authAxios
			.post('/register', { email, password })
			.then((response) => {
				console.log('response :>> ', response)
				authAxios.post('/login', { email, password }).then((response) => {
					if (response.data.message) {
						console.error(response.data.message)
					} else {
						dispatch(loginUser(response.data))
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
			})
			.catch((error) => console.log(error))
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
			<h1 style={{ margin: '3rem 0' }}>Register Page</h1>
			<form onSubmit={handleSubmit(registerUser)}>
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
			<p>
				{'Already a user?'}
				<Link
					to={{
						pathname: '/login',
						state: { next: props.location?.state?.next },
					}}
					style={{ color: 'white' }}
				>
					{'Log in here'}
				</Link>
			</p>
		</div>
	)
}

export default Register

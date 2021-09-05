import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { authAxios } from '../helpers/auth-axios'
import { loginUser } from '../redux/user/userActions'
import banner from '../assets/images/banner.jpg'
import { Col, Container, Row } from 'react-bootstrap'

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
		<section style={{ marginTop: '1rem' }}>
			<section
				style={{ backgroundImage: `url(${banner})` }}
				className='sign-up'
			>
				<Container>
					<Row>
						<Col lg={12} style={{ textAlign: 'center' }}>
							<div>
								<h2>Sign Up</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section style={{ paddingTop: '130px', paddingBottom: '150px' }}>
				<Container>
					<Row>
						<Col lg={6}>
							<div className='sign-up-form'>
								<h3>Sign Up</h3>
								<form onSubmit={handleSubmit(registerUser)}>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Email address'
											name='email'
											{...register('email')}
										/>
										<i className='fas fa-envelope input-item-icon'></i>
										<p>{errors.email?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Your Name'
											name='username'
											{...register('username')}
										/>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6 input-item-icon'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
											/>
										</svg>
										<p>{errors.username?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Password'
											name='password'
											{...register('password')}
										/>
										<i className='fas fa-lock input-item-icon'></i>
										<p>{errors.password?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Confirm Password'
											name='confirmPassword'
											{...register('confirmPassword')}
										/>
										<i className='fas fa-lock input-item-icon'></i>
										<p>{errors.confirmPassword && 'Password have to match'}</p>
									</div>
									<button>Login Now</button>
								</form>
								<h5>
									{'Already have an account? '}
									<Link
										to={{
											pathname: '/login',
											state: { next: props.location?.state?.next },
										}}
									>
										Log In!
									</Link>
								</h5>
							</div>
						</Col>
						<Col lg={6}>
							<div className='social-links'>
								<h3>Login With:</h3>
								<ul>
									<li>
										<a href='#' className='facebook'>
											<i className='fab fa-facebook-f'></i>
											{' Sign in With Facebook'}
										</a>
									</li>
									<li>
										<a href='#' className='google'>
											<i className='fab fa-google'></i>
											{' Sign in With Google'}
										</a>
									</li>
									<li>
										<a href='#' className='twitter'>
											<i className='fab fa-twitter'></i>
											{' Sign in With Twitter'}
										</a>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</section>
		// <div
		// 	style={{
		// 		backgroundColor: 'blue',
		// 		display: 'flex',
		// 		flexDirection: 'column',
		// 		alignItems: 'center',
		// 	}}
		// >
		// 	<h1 style={{ margin: '3rem 0' }}>Register Page</h1>
		// 	<form onSubmit={handleSubmit(registerUser)}>
		// 		<input
		// 			type='text'
		// 			name='username'
		// 			placeholder='username'
		// 			{...register('username')}
		// 		/>
		// 		<p>{errors.username?.message}</p>
		// 		<input
		// 			type='text'
		// 			name='email'
		// 			placeholder='email'
		// 			{...register('email')}
		// 		/>
		// 		<p>{errors.email?.message}</p>
		// 		<input
		// 			type='text'
		// 			name='password'
		// 			placeholder='password'
		// 			{...register('password')}
		// 		/>
		// 		<p>{errors.password?.message}</p>
		// 		<input
		// 			type='text'
		// 			name='confirmPassword'
		// 			placeholder='Confirm password'
		// 			{...register('confirmPassword')}
		// 		/>
		// 		<p>{errors.confirmPassword && 'Password have to match'}</p>
		// 		<input type='submit' />
		// 	</form>
		// 	<p>
		// 		{'Already a user?'}
		// 		<Link
		// 			to={{
		// 				pathname: '/login',
		// 				state: { next: props.location?.state?.next },
		// 			}}
		// 			style={{ color: 'white' }}
		// 		>
		// 			{'Log in here'}
		// 		</Link>
		// 	</p>
		// </div>
	)
}

export default Register

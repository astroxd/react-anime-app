import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authAxios } from '../helpers/auth-axios'
import { loginUser, logoutUser } from '../redux/user/userActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import banner from '../assets/images/banner.jpg'

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
		email: yup.string().email().required(),
		password: yup.string().min(6).max(15).required(),
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
								<h2>Login</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section style={{ paddingTop: '130px', paddingBottom: '150px' }}>
				<Container>
					<Row>
						<Col lg={6}>
							<div className='sign-up-form login'>
								<h3>Login</h3>
								<form onSubmit={handleSubmit(login)}>
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
											placeholder='Password'
											name='password'
											{...register('password')}
										/>
										<i className='fas fa-lock input-item-icon'></i>
										<p>{errors.password?.message}</p>
									</div>

									<button>Login Now</button>
								</form>
								<Link className='forgot-pass'>Forgot Your Password?</Link>
							</div>
						</Col>
						<Col lg={6}>
							<div className='login-register'>
								<h3>{"Don't Have an Account?"}</h3>
								<Link
									to={{
										pathname: '/register',
										state: { next: props.location?.state?.next },
									}}
								>
									Register Now
								</Link>
							</div>
						</Col>
						<div className='login-social'>
							<Row>
								<Col lg={6}>
									<div className='login-social-links'>
										<span>or</span>
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
						</div>
					</Row>
				</Container>
			</section>
		</section>
	)
}

export default Login

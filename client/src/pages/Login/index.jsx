import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { authAxios } from './../../helpers/auth-axios'
import AuthContext from '../../context/AuthProvider'

import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Col, Container, Row } from 'react-bootstrap'
import banner from './../../assets/images/banner.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import {
	faFacebookF,
	faGoogle,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'

const Login = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const { setAuth } = useContext(AuthContext)

	const [error, setError] = useState('')

	const login = async (data) => {
		const { email, password } = data

		try {
			const response = await authAxios.post('/login', { email, password })

			if (response) {
				console.log('response :>> ', response)

				if (response?.data?.error) {
					console.log(response.data.error)
					setError(response.data.error)
				} else {
					console.log('object :>> ', response.data.user)
					setAuth(response.data.user)
					navigate(location.state?.next || '/', { replace: true })
				}
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
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
			<div style={{ backgroundImage: `url(${banner})` }} className='auth'>
				<Container>
					<Row>
						<Col lg={12} style={{ textAlign: 'center' }}>
							<div>
								<h2>Login</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<section style={{ paddingTop: '130px', paddingBottom: '150px' }}>
				<Container>
					<Row>
						<Col lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<div className='auth-form login-form'>
								<h3>Login</h3>
								<p className='error'>{error}</p>

								<form onSubmit={handleSubmit(login)}>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Email address'
											name='email'
											{...register('email')}
										/>
										<FontAwesomeIcon
											icon={faEnvelope}
											className='input-item-icon'
										/>
										<p>{errors.email?.message}</p>
									</div>

									<div className='input-item'>
										<input
											type='text'
											placeholder='Password'
											name='password'
											{...register('password')}
										/>
										<FontAwesomeIcon
											icon={faLock}
											className='input-item-icon'
										/>
										<p>{errors.password?.message}</p>
									</div>

									<button className='primary-btn'>Login Now</button>
								</form>
								<Link to='/' className='forgot-pass'>
									Forgot Your Password?
								</Link>
							</div>
						</Col>
						<Col lg={6}>
							<div className='login-register'>
								<h3>{"Don't Have an Account?"}</h3>
								<Link
									to='/register'
									state={{ next: location.state?.next || '/' }}
									replace
									className='primary-btn'
								>
									Register Now
								</Link>
							</div>
						</Col>
						<div className='social-links login'>
							<Row>
								<Col lg={6}>
									<div style={{ textAlign: 'center' }}>
										<span>or</span>
										<ul>
											<li>
												<a href='#' className='facebook'>
													<FontAwesomeIcon icon={faFacebookF} />
													{/* <i className='fab fa-facebook-f'></i> */}
													{'Sign in With Facebook'}
												</a>
											</li>
											<li>
												<a href='#' className='google'>
													<FontAwesomeIcon icon={faGoogle} />
													{/* <i className='fab fa-google'></i> */}
													{'Sign in With Google'}
												</a>
											</li>
											<li>
												<a href='#' className='twitter'>
													<FontAwesomeIcon icon={faTwitter} />
													{/* <i className='fab fa-twitter'></i> */}
													{'Sign in With Twitter'}
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

import { useContext } from 'react'
import { authAxios } from './../../helpers/auth-axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import banner from './../../assets/images/banner.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebookF,
	faGoogle,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/AuthProvider'
import { useState } from 'react'

const Login = (props) => {
	const navigate = useNavigate()
	const { setAuth } = useContext(AuthContext)

	const login = async (data) => {
		const { email, password } = data

		try {
			const response = await authAxios.post('/login', { email, password })

			if (response) {
				console.log('response :>> ', response)

				if (response?.data?.error) {
					console.log(response.data.error)
					// TODO show error
				} else {
					console.log('object :>> ', response.data.user)
					setAuth(response.data.user)
					navigate('/') //TODO add next props to redirect
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
									to={{
										pathname: '/register',
										state: { next: props.location?.state?.next },
									}}
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

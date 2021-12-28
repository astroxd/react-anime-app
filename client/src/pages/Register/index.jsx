import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { authAxios } from '../../helpers/auth-axios'
import { loginUser } from '../../redux/user/userActions'
import banner from './../../assets/images/banner.jpg'
import { Col, Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebookF,
	faGoogle,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

const Register = (props) => {
	// const dispatch = useDispatch()
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
						// dispatch(loginUser(response.data))
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
			<div style={{ backgroundImage: `url(${banner})` }} className='auth'>
				<Container>
					<Row>
						<Col lg={12} style={{ textAlign: 'center' }}>
							<div>
								<h2>Sign Up</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<section style={{ paddingTop: '130px', paddingBottom: '180px' }}>
				<Container>
					<Row>
						<Col
							lg={6}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<div className='auth-form sign-up-form'>
								<h3>Sign Up</h3>
								<form onSubmit={handleSubmit(registerUser)}>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Email address'
											name='email'
											{...register('email')}
										/>
										{/* <i className='fas fa-envelope input-item-icon'></i> */}
										<FontAwesomeIcon
											icon={faEnvelope}
											className='input-item-icon'
										/>
										<p>{errors.email?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Your Name'
											name='username'
											{...register('username')}
										/>
										{/* <svg
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
										</svg> */}
										<FontAwesomeIcon
											icon={faUser}
											className='input-item-icon'
										/>
										<p>{errors.username?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Password'
											name='password'
											{...register('password')}
										/>
										{/* <i className='fas fa-lock input-item-icon'></i> */}
										<FontAwesomeIcon
											icon={faLock}
											className='input-item-icon'
										/>
										<p>{errors.password?.message}</p>
									</div>
									<div className='input-item'>
										<input
											type='text'
											placeholder='Confirm Password'
											name='confirmPassword'
											{...register('confirmPassword')}
										/>
										{/* <i className='fas fa-lock input-item-icon'></i> */}
										<FontAwesomeIcon
											icon={faLock}
											className='input-item-icon'
										/>
										<p>{errors.confirmPassword && 'Password have to match'}</p>
									</div>
									<button className='primary-btn'>Login Now</button>
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
								</form>
							</div>
						</Col>
						<Col lg={6}>
							<div className='social-links sign-up'>
								<h3>Login With:</h3>
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
				</Container>
			</section>
		</section>
	)
}

export default Register

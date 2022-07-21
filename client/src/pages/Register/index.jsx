import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { authAxios } from '../../helpers/auth-axios'
import AuthContext from '../../context/AuthProvider'

import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Col, Container, Row } from 'react-bootstrap'
import banner from './../../assets/images/banner.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import {
	faFacebookF,
	faGoogle,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'

const Register = (props) => {
	const navigate = useNavigate()
	const { setAuth } = useContext(AuthContext)

	const [error, setError] = useState('')

	const registerUser = async (data) => {
		const { email, password, username, avatar } = data

		const formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)
		formData.append('username', username)
		formData.append('avatar', avatar.item(0))

		try {
			const response = await authAxios.post('/register', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			if (response) {
				console.log('response :>> ', response)

				if (response?.data?.error) {
					console.log(response.data.error)
					setError(response.data.error)
				} else {
					console.log('object :>> ', response.data.user)
					setAuth(response.data.user)
					navigate('/')
				}
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const schema = yup.object().shape({
		username: yup.string().required('custom message for username'),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(30).required(),
		confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
		avatar: yup
			.mixed()
			.test(
				'fileSize',
				'The file is too large. (Max size 5Mb)',
				(inputFileList) => {
					if (!inputFileList.length) return true //* File is not required
					return inputFileList[0].size <= 5 * 1000 * 1000 //* Byte -> Kb -> Mb
				}
			),
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
								<p className='error'>{error}</p>
								<form onSubmit={handleSubmit(registerUser)}>
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
											placeholder='Your Name'
											name='username'
											{...register('username')}
										/>
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
										<FontAwesomeIcon
											icon={faLock}
											className='input-item-icon'
										/>
										<p>{errors.confirmPassword && 'Passwords have to match'}</p>
									</div>
									<div style={{ width: '370px', marginBottom: '10px' }}>
										<input
											type='file'
											name='avatar'
											accept='image/*'
											{...register('avatar')}
										/>
										<p>{errors.avatar?.message}</p>
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

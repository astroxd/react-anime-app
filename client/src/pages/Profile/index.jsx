import { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import banner from '../../assets/images/banner.jpg'
import AuthContext from '../../context/AuthProvider'

import './Profile.css'

const Profile = () => {
	const { auth } = useContext(AuthContext)

	return (
		<section className='profile-page'>
			<div className='header'>
				<img src={banner} alt='banner' style={{ width: '100%' }} />
				<div className='profile-info'>
					<Container>
						<Row>
							<Col
								xl={3}
								md={5}
								style={{ justifyContent: 'center', alignItems: 'center' }}
							>
								{auth.email ? (
									<img src={auth.avatar} alt='avatar' className='avatar' />
								) : (
									<></>
								)}
							</Col>
							<Col xl={9} md={7}>
								<div className='info'>
									<h2 className='username'>{auth?.username}</h2>
									<p className='description'>
										user description: Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Assumenda tempora quam qui? Eaque adipisci
										corporis ab magni accusamus iste eligendi!
									</p>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<ul className='nav-links'>
									<li>
										<NavLink
											end
											to=''
											className={({ isActive }) =>
												isActive ? 'nav-link active' : 'nav-link'
											}
										>
											Overview
										</NavLink>
									</li>
									<li>
										<NavLink
											to='lists'
											className={({ isActive }) =>
												isActive ? 'nav-link active' : 'nav-link'
											}
										>
											Lists
										</NavLink>
									</li>
									<li>
										<NavLink
											to='favorites'
											className={({ isActive }) =>
												isActive ? 'nav-link active' : 'nav-link'
											}
										>
											Favorites
										</NavLink>
									</li>
									<li>
										<NavLink
											to='statistics'
											className={({ isActive }) =>
												isActive ? 'nav-link active' : 'nav-link'
											}
										>
											Statistics
										</NavLink>
									</li>
								</ul>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
			<div className='content'>
				<Outlet />
			</div>
		</section>
	)
}

export default Profile

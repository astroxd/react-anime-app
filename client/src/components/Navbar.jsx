// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import Searchbar from './Searchbar'
import { Container, Row, Col, Dropdown, Navbar } from 'react-bootstrap'
import logo from './../assets/images/logo.png'

const CustomNavbar = () => {
	// const selector = useSelector((state) => state.user)

	// const [state, setstate] = useState(true)

	// const location = useLocation()
	// const [path, setPath] = useState('/')

	// const getSession = () => {
	// 	if (selector) {
	// 		console.log(selector.logged)
	// 		setstate(selector.logged)
	// 	}
	// }

	// useEffect(() => {
	// 	getSession()
	// 	setPath(location.pathname)
	// }, [location, selector])

	return (
		<header id='navbar'>
			<Container>
				<Row xs={2}>
					<Col lg={2}>
						<div className='header-logo'>
							<Link to='/'>
								<img src={logo} alt='' />
							</Link>
						</div>
					</Col>
					<Col lg={8} className='header-middle'>
						<div className='header-middle'>
							<ul className='navbar-nav'>
								<li className='nav-item  '>
									<Link to='/' className='nav-link nav-active'>
										Homepage
									</Link>
								</li>
								<li className='nav-item'>
									<Dropdown>
										<Dropdown.Toggle className='nav-link toggle-btn'>
											Categories
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item className='dropdown-item'>
												caca
											</Dropdown.Item>
											<Dropdown.Item className='dropdown-item'>
												caca
											</Dropdown.Item>
											<Dropdown.Item className='dropdown-item'>
												caca
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</li>
								<li className='nav-item'>
									<Link to='/' className='nav-link'>
										Our Blog
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/' className='nav-link'>
										Contacts
									</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={2}>
						<div className='header-right'>
							<Link to='/' id='search'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</Link>
							<Link to='/'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
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
							</Link>
							<button className='collapse-btn'>cacca</button>
						</div>
					</Col>
				</Row>
				<div>show here mid content using if</div>
			</Container>
		</header>
	)
}

export default CustomNavbar

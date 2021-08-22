import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
// import Searchbar from './Searchbar'
import {
	Container,
	Row,
	Col,
	Dropdown,
	Navbar,
	Breadcrumb,
} from 'react-bootstrap'
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

	const [show, setShow] = useState(false)
	const location = useLocation()

	const [paths, setPaths] = useState([])

	let previousPath = ''

	useEffect(() => {
		console.log(location)
		// console.log(location.pathname.replaceAll('/', ',/').split(','))
		// setPaths(location.pathname.replaceAll('/', ',/').split(','))
		if (location.pathname === '/') {
			setPaths([''])
		} else {
			console.log(location.pathname.split('/'))
			setPaths(location.pathname.split('/'))
		}
	}, [location])

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
					<Col lg={8} className='header-col-middle'>
						<div className='header-middle'>
							<ul className='navbar-nav'>
								<li className='nav-item  '>
									<NavLink
										to='/'
										className='nav-link'
										activeClassName='nav-active'
									>
										Homepage
									</NavLink>
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
									<NavLink
										to='/'
										className='nav-link'
										activeClassName='nav-active'
									>
										Our Blog
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to='/'
										className='nav-link'
										activeClassName='nav-active'
									>
										Contacts
									</NavLink>
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
							<Link to='/' id='profile'>
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
							<Navbar.Toggle
								className=' collapse-btn'
								aria-controls='basic-navbar-nav'
								onClick={() => setShow(!show)}
							>
								Menu
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path
										fillRule='evenodd'
										d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
										clipRule='evenodd'
									/>
								</svg>
							</Navbar.Toggle>
						</div>
					</Col>
				</Row>
				<Col
					className={` pb-2 ${show ? 'show' : ''} collapse`}
					style={{ backgroundColor: 'white' }}
				>
					<Navbar.Collapse className={` ${show ? 'show' : ''}`}>
						<ul className='navbar-nav-col' style={{ marginLeft: '8px' }}>
							<li className='nav-item-collapse'>
								<Link className='nav-link-collapse'>cacac</Link>
							</li>
							<li className='nav-item-collapse'>
								<Link className='nav-link-collapse'>ca</Link>
							</li>
							<li className='nav-item-collapse'>
								<Link className='nav-link-collapse'>ca</Link>
							</li>
							<li className='nav-item-collapse'>
								<Link className='nav-link-collapse'>ca</Link>
							</li>
						</ul>
					</Navbar.Collapse>
				</Col>
			</Container>
			<Container fluid className='breadcrumb-container'>
				<Container>
					<Breadcrumb>
						{paths.map((path, idx) => {
							if (path !== '') {
								previousPath = previousPath.concat(`/${path}`)
							}
							if (path === '') {
								return (
									<Breadcrumb.Item
										key={idx}
										linkAs={Link}
										linkProps={{ to: previousPath }}
									>
										<i className='fas fa-home'></i>
										Home
									</Breadcrumb.Item>
								)
							}
							if (idx === paths.length - 1) {
								return (
									<Breadcrumb.Item active key={idx}>
										{path}
									</Breadcrumb.Item>
								)
							}

							return (
								<Breadcrumb.Item
									key={idx}
									linkAs={Link}
									linkProps={{ to: previousPath }}
								>
									{path}
								</Breadcrumb.Item>
							)
						})}
					</Breadcrumb>
				</Container>
			</Container>
		</header>
	)
}

export default CustomNavbar

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import profilePicture from '../assets/images/profile_picture.svg'
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
	// const [user, setUser] = useState(null)
	// const [state, setstate] = useState(true)

	const location = useLocation()

	// const getSession = () => {
	// 	if (selector) {
	// 		console.log(selector.logged)
	// 		setstate(selector.logged)
	// 	}
	// }

	const [logged, setLogged] = useState(true)

	const [show, setShow] = useState(false)

	const [paths, setPaths] = useState([])

	let previousPath = ''

	//* ADD to dropdown component
	const [openMenu, setOpenMenu] = useState(false)

	document.onclick = (e) => {
		console.log(e.target)
		if (
			e.target.closest('#profile') == null ||
			//! if it's a link it doesnt work
			e.target.closest('.profile-menu-item') != null
		) {
			setOpenMenu(false)
		}
	}

	const handleResize = (e) => {
		const windowWidth = e.target.innerWidth
		if (windowWidth >= 992) {
			setShow(false)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		if (location.pathname === '/') {
			setPaths([''])
		} else {
			setPaths(location.pathname.split('/'))
		}
		return () => {
			window.removeEventListener('resize', handleResize)
		}
		// console.log(selector)
		// if (selector) {
		// 	setUser(selector)
		// }
		// setUser(selector)
	}, [location])

	return (
		<header id='navbar'>
			<Container>
				<Row xs={2}>
					<Col lg={2}>
						<div className='header-logo'>
							<Link to='/'>
								<img src={logo} alt='logo' />
							</Link>
						</div>
					</Col>
					<Col lg={8} className='header-col-middle'>
						<div>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<NavLink
										to='/'
										exact
										className='nav-link'
										activeClassName='nav-active'
									>
										Homepage
									</NavLink>
								</li>
								{/* <li className='nav-item'>
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
								</li> */}
								<li className='nav-item'>
									<NavLink
										to='/login'
										className='nav-link'
										activeClassName='nav-active'
									>
										Login
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to='/register'
										className='nav-link'
										activeClassName='nav-active'
									>
										Register
									</NavLink>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={2}>
						<div className='header-right'>
							<Link to='/' id='search'>
								<FontAwesomeIcon
									icon={faSearch}
									size='lg'
									style={{ verticalAlign: 'middle' }}
								/>
							</Link>
							<div id='profile'>
								{logged ? (
									<img
										src={profilePicture}
										alt='profile-picture'
										style={{ height: '30px', cursor: 'pointer' }}
										onClick={() => setOpenMenu(!openMenu)}
									/>
								) : (
									<FontAwesomeIcon
										icon={faUserCircle}
										style={{ fontSize: '26px', verticalAlign: 'middle' }}
										onClick={() => setOpenMenu(!openMenu)}
									/>
								)}
								{openMenu && (
									<div className='profile-menu'>
										{logged ? (
											<ul>
												<li className='profile-menu-item'>
													<Link
														to='/watchlist'
														onClick={() => setOpenMenu(!openMenu)}
													>
														Wathclist
													</Link>
												</li>
												<li className='profile-menu-item'>cacca</li>
											</ul>
										) : (
											<ul>
												<li className='profile-menu-item'>logIn</li>
											</ul>
										)}
									</div>
								)}
							</div>
							<Navbar.Toggle
								className=' primary-btn collapse-btn'
								aria-controls='basic-navbar-nav'
								onClick={() => setShow(!show)}
							>
								<span style={{ verticalAlign: 'middle' }}>Menu</span>
								<FontAwesomeIcon icon={faBars} />
							</Navbar.Toggle>
						</div>
					</Col>
				</Row>
				{/*  REMOVE COLLAPSE AND TOGGLE */}
				{show && (
					<Col
						className={` show collapse`}
						style={{ backgroundColor: 'white' }}
					>
						<Navbar.Collapse className={` show`}>
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
				)}
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

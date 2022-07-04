import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import profilePicture from '../assets/images/profile_picture.svg'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import logo from './../assets/images/logo.png'
import { useClickOutside } from './useClickOutsideHook'

const CustomNavbar = () => {
	// const selector = useSelector((state) => state.user)
	// const [user, setUser] = useState(null)
	// const [state, setstate] = useState(true)

	const location = useLocation()
	const navigate = useNavigate()

	// eslint-disable-next-line no-unused-vars
	const [logged, setLogged] = useState(true)

	//* collapse menu
	const [show, setShow] = useState(false)

	const [paths, setPaths] = useState([])

	let previousPath = ''

	//* profile menu
	const [openMenu, setOpenMenu] = useState(false)

	const handleResize = (e) => {
		const windowWidth = e.target.innerWidth
		if (windowWidth >= 992) {
			setShow(false)
		}
	}

	let domNode = useClickOutside(() => {
		setOpenMenu(false)
	})

	const gotoSearch = (e) => {
		e.preventDefault()
		const query = e.target[0].value
		e.target[0].value = ''
		navigate(`/search`, {
			state: { search: query },
		})
		// setSearchParams({ query: query }, { state: { query: query } })

		// setSearchParams(
		// 	{ query: e.target[0].value },
		// 	{ state: { query: e.target[0].value } }
		// )
		// history.push({
		// 	pathname: '/search',
		// 	search: `?query=${e.target[0].value}`,
		// })
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (location.pathname === '/anime') {
			navigate('/', { replace: true })
		}

		if (location.pathname === '/') {
			setPaths([''])
		} else {
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
										className={({ isActive }) =>
											isActive ? 'nav-link nav-active' : 'nav-link'
										}
									>
										Homepage
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to='watchlist'
										className={({ isActive }) =>
											isActive ? 'nav-link nav-active' : 'nav-link'
										}
									>
										Watchlist
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
										to='search'
										className={({ isActive }) =>
											isActive ? 'nav-link nav-active' : 'nav-link'
										}
									>
										Search Anime
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to='favorite'
										className={({ isActive }) =>
											isActive ? 'nav-link nav-active' : 'nav-link'
										}
									>
										Favorites
									</NavLink>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={2}>
						<div className='header-right'>
							<div className='search-bar'>
								<form onSubmit={(e) => gotoSearch(e)}>
									<input
										type='text'
										className='search-bar-input'
										placeholder='Search...'
									/>
									<button className='search-bar-button' type='submit'>
										<FontAwesomeIcon
											icon={faSearch}
											style={{ verticalAlign: 'middle' }}
										/>
									</button>
								</form>
							</div>
							<div id='profile' ref={domNode}>
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
								<div className={`profile-menu ${openMenu ? 'show' : ''}`}>
									{logged ? (
										<ul>
											<li className='profile-menu-item'>
												<Link to='/watchlist'>Wathclist</Link>
											</li>
											<li className='profile-menu-item'>
												<Link to='/settings'>Settings</Link>
											</li>
										</ul>
									) : (
										<ul>
											<li className='profile-menu-item'>logIn</li>
										</ul>
									)}
								</div>
							</div>
							<button
								className='primary-btn collapse-btn'
								onClick={() => setShow(!show)}
							>
								<span>Menu</span>
								<FontAwesomeIcon
									icon={faBars}
									style={{ verticalAlign: 'middle' }}
								/>
							</button>
						</div>
					</Col>
				</Row>
				{show && (
					<Row>
						<Col>
							<div className='nav-collapse-menu'>
								<ul>
									<li className='nav-collapse-item'>
										<Link className='nav-collapse-link' to='/login'>
											Login
										</Link>
									</li>
									<li className='nav-collapse-item'>
										<Link className='nav-collapse-link' to='/register'>
											Register
										</Link>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
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
										<FontAwesomeIcon icon={faHome} />
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

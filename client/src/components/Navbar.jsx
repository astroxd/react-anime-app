import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import logo from './../assets/images/logo.png'
import { useClickOutside } from './../hooks/useClickOutside'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { authAxios } from '../helpers/auth-axios'

const CustomNavbar = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const { auth, setAuth } = useContext(AuthContext)

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

	const logOut = async () => {
		try {
			const response = await authAxios.post('/logout')

			if (response) {
				console.log('response :>> ', response)

				if (response?.data?.error) {
					console.log(response.data.error)
					// TODO show error
				} else {
					console.log('object :>> ', response.data.user)
					setAuth(response.data.user)
				}
			}
		} catch (error) {
			console.log('error', error)
		}
	}

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
							<div className='profile' ref={domNode}>
								{auth?.email ? (
									<img
										src={auth.avatar}
										alt={`${auth.username} avatar`}
										className='avatar'
										onClick={() => {
											setOpenMenu(!openMenu)
											console.log(auth)
										}}
										onError={(e) => {
											e.target.src = `https://avatars.dicebear.com/api/initials/${auth.username}.svg`
										}}
									/>
								) : (
									<FontAwesomeIcon
										icon={faUserCircle}
										className='avatar'
										onClick={() => setOpenMenu(!openMenu)}
									/>
								)}
								<div
									className={`dropdown-menu profile-menu ${
										openMenu ? 'show' : ''
									}`}
								>
									{auth?.email ? (
										<ul>
											<li
												className='dropdown-menu-item profile-menu-user no-hover'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/profile'>
													Signed in as <b>{auth.username}</b>
												</Link>
											</li>
											<li
												className='dropdown-menu-item profile-menu-item divided'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/profile'>Your profile</Link>
											</li>
											<li
												className='dropdown-menu-item profile-menu-item'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/profile'>Your lists</Link>
											</li>
											<li
												className='dropdown-menu-item profile-menu-item'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/profile'>Your favorites</Link>
											</li>
											<li
												className='dropdown-menu-item profile-menu-item'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/settings'>Settings</Link>
											</li>
											<li
												className='dropdown-menu-item profile-menu-sign-out divided'
												onClick={() => {
													setOpenMenu(!openMenu)
													logOut()
												}}
											>
												Log Out
											</li>
										</ul>
									) : (
										<ul>
											<li
												className='dropdown-menu-item profile-menu-item'
												onClick={() => setOpenMenu(!openMenu)}
											>
												<Link to='/login'>Log In</Link>
											</li>
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

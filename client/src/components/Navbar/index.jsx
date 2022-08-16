import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import NavLinks from './components/NavLinks'
import SearchBar from './components/SearchBar'
import UserMenu from './components/UserMenu'
import MobileCollapseMenu from './components/MobileCollapseMenu'
import BreadCrumbs from './components/BreadCrumbs'

const CustomNavbar = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	//* collapse menu
	const [showCollapseMenu, setShowCollapseMenu] = useState(false)

	const handleResize = (e) => {
		const windowWidth = e.target.innerWidth
		if (windowWidth >= 992) {
			setShowCollapseMenu(false)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (pathname === '/anime') {
			navigate('/', { replace: true })
		}

		//* Scroll to the top of the page when navigating
		window.scrollTo(0, 0)
	}, [pathname])

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
						<NavLinks />
					</Col>
					<Col lg={2}>
						<div className='header-right'>
							<SearchBar />
							<UserMenu />
							<button
								className='primary-btn collapse-btn'
								onClick={() => setShowCollapseMenu(!showCollapseMenu)}
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
				<MobileCollapseMenu showMenu={showCollapseMenu} />
			</Container>
			<BreadCrumbs />
		</header>
	)
}

export default CustomNavbar

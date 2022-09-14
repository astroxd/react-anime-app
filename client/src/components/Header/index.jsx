import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import logo from '../../assets/images/logo.png'

import NavLinks from './components/NavLinks'
import SearchBar from './components/SearchBar'
import UserMenu from './components/UserMenu'
import MobileCollapseMenuButton from './components/MobileCollapseMenuButton'
import MobileCollapseMenu from './components/MobileCollapseMenu'

import BreadCrumbs from './components/BreadCrumbs'

//* Style
import './Header.css'

const Header = () => {
	const { pathname } = useLocation()

	//* collapse menu
	const [showCollapseMenu, setShowCollapseMenu] = useState(false)

	useEffect(() => {
		//* Scroll to the top of the page when navigating
		window.scrollTo(0, 0)
	}, [pathname])

	let lastPosition = 0
	const [scoped, setScoped] = useState(false)
	const handleScroll = () => {
		//* If collapse menu is open navbar moves back, do not calculate scope when menu is open
		if (showCollapseMenu) return
		console.log('fire')

		//* If lastPosition e.g 200 - current position e.g 100 is positive it means user is moving up
		if (lastPosition - window.scrollY >= 0) setScoped(true)
		else setScoped(false)

		//* Save last position
		lastPosition = window.scrollY
	}

	useEffect(() => {
		document.addEventListener('scroll', handleScroll)
		return () => {
			document.removeEventListener('scroll', handleScroll)
		}
	}, [showCollapseMenu]) //* Updates with the collapse menu state

	return (
		<>
			<header id='navbar' className={`${scoped ? 'scoped' : ''}`}>
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
								<MobileCollapseMenuButton
									showCollapseMenu={showCollapseMenu}
									setShowCollapseMenu={setShowCollapseMenu}
								/>
							</div>
						</Col>
					</Row>
					<MobileCollapseMenu showMenu={showCollapseMenu} />
				</Container>
			</header>
			{/* <BreadCrumbs /> */}
		</>
	)
}

export default Header

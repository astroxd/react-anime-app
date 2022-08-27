import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import logo from '../../assets/images/logo.png'

import NavLinks from './components/NavLinks'
import SearchBar from './components/SearchBar'
import UserMenu from './components/UserMenu'
import MobileCollapseMenu from './components/MobileCollapseMenu'
import BreadCrumbs from './components/BreadCrumbs'
import MobileCollapseMenuButton from './components/MobileCollapseMenuButton'

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
							<MobileCollapseMenuButton
								showCollapseMenu={showCollapseMenu}
								setShowCollapseMenu={setShowCollapseMenu}
							/>
						</div>
					</Col>
				</Row>
				<MobileCollapseMenu showMenu={showCollapseMenu} />
			</Container>
			<BreadCrumbs />
		</header>
	)
}

export default Header

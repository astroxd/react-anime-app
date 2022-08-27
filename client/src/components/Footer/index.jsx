import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import logo from '../../assets/images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

//* Style
import './Footer.css'

const Footer = () => {
	return (
		<div className='footer'>
			<div
				className='page-up'
				onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
			>
				<span>
					<FontAwesomeIcon
						icon={faChevronUp}
						style={{ position: 'relative', top: '5px' }}
					/>
				</span>
			</div>
			<Container>
				<Row>
					<Col lg={3} className='footer-logo'>
						<Link to='/'>
							<img src={logo} alt='logo' />
						</Link>
					</Col>
					<Col lg={6}>
						<div className='footer-nav'>
							<ul>
								<li>
									<Link to='/'>Homepage</Link>
								</li>
								<li>
									<Link to='/watchlist'>Watchlist</Link>
								</li>
								<li>
									<Link to='/search'>Search Anime</Link>
								</li>
								<li>
									<Link to='/favorites'>Favorites</Link>
								</li>
							</ul>
							<ul className='social-icons'>
								<li>
									<a
										href='https://github.com/astroxd/react-anime-app'
										target='blank'
									>
										<FontAwesomeIcon icon={faGithub} size={'3x'} />
									</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={3} style={{ textAlign: 'center' }}>
						<p style={{ color: 'var(--text-secondary)' }}>
							Copyright ©{new Date().getFullYear()} All rights reserved
						</p>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Footer

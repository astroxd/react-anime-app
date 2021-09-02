import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './../assets/images/logo.png'

const Footer = () => {
	return (
		<div className='footer'>
			<div
				className='page-up'
				onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
			>
				<span>
					<i className='fas fa-chevron-up'></i>
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
									<Link>Homepage</Link>
								</li>
								<li>
									<Link>Categories</Link>
								</li>
								<li>
									<Link>Our Blog</Link>
								</li>
								<li>
									<Link>Contacts</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col lg={3} style={{ textAlign: 'center' }}>
						<p>
							Copyright ©{new Date().getFullYear()}
							{' All rights reserved'}
						</p>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Footer

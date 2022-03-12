import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

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
					{/* Use if remove font awesome icon package */}
					{/* <i className='fas fa-chevron-up'></i> */}
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
									<Link to='/'>Categories</Link>
								</li>
								<li>
									<Link to='/'>Our Blog</Link>
								</li>
								<li>
									<Link to='/'>Contacts</Link>
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

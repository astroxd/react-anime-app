import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

const Header = () => {
	// let { url } = useRouteMatch()
	return (
		<section
			className='settings-header'
			style={{ marginTop: '40px', marginBottom: '60px' }}
		>
			<Container>
				<Row>
					<Col>
						<div className='section-header'>
							<div className='section-title'>
								<h2>Settings</h2>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='link-container'>
							{/* <Link to={`${url}/profile`} className='active'>
								Profile
							</Link>
							<Link to={`${url}/profile`}>Profile</Link>
							<Link to={`${url}/profile`}>Profile</Link>
							<Link to={`${url}/profile`}>Profile</Link> */}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Header

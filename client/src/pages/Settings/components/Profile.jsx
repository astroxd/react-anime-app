import { Col, Container, Row } from 'react-bootstrap'

const Profile = () => {
	return (
		<section
			className='settings-content profile'
			style={{ marginTop: '40px', marginBottom: '60px' }}
		>
			<Container>
				<div>
					<Row>
						<Col>
							<div className='section-header'>
								<div className='section-title'>
									<h4>Customize Profile</h4>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div>
								<h5>Display Name</h5>
								<input type='text' name='' id='' />
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</section>
	)
}

export default Profile

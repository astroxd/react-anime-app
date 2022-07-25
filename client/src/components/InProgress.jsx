import { Container, Row, Col } from 'react-bootstrap'
import BuildingPage from './../assets/images/BuildingPage.svg'
const InProgress = () => {
	return (
		<section className='inprogress'>
			<Container>
				<Row>
					<h2 className='title'>
						Wear your protections ! <br />
						This page is under construction <br />
						Come back later
					</h2>
				</Row>
				<Row>
					<Col>
						<img src={BuildingPage} alt='Building Page' />
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default InProgress

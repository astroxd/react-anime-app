import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import NoRoute from '../../assets/images/NoRoute.svg'

//* Style
import './NotFound.css'

const NotFound = () => {
	return (
		<section className='notfound'>
			<Container>
				<Row>
					<h2 className='title'>
						This route hasn&apos;t yet been discovered <br /> Maybe it&apos;s
						better to go <Link to='/'>Home</Link>
					</h2>
				</Row>
				<Row>
					<Col>
						<img src={NoRoute} alt='Building Page' />
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default NotFound

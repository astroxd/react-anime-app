import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CharacterCard from './CharacterCard'

const Characters = () => {
	return (
		<div className='anime-details-character'>
			<Row>
				<Col lg={8} md={8} sm={8}>
					<div className='section-title'>
						<h5>Characters</h5>
					</div>
				</Col>
				<Col lg={4} md={4} sm={4}>
					<div className='button-all'>
						<Link to='/'>
							View All
							<i className='fas fa-long-arrow-alt-right'></i>
						</Link>
					</div>
				</Col>
			</Row>
			<div className='characters'>
				<CharacterCard />
				<CharacterCard />
				<CharacterCard />
			</div>
		</div>
	)
}

export default Characters

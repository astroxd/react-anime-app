import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CharacterCard from './CharacterCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const Characters = () => {
	return (
		<div className='anime-details-character'>
			<Row>
				<Col>
					<div className='section-header'>
						<div className='section-title'>
							<h5>Characters</h5>
						</div>
						<div className='section-button-all'>
							<Link to='/'>
								View All
								<FontAwesomeIcon icon={faLongArrowAltRight} />
								{/* <i className='fas fa-long-arrow-alt-right'></i> */}
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='characters'>
						<CharacterCard />
						<CharacterCard />
						<CharacterCard />
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Characters

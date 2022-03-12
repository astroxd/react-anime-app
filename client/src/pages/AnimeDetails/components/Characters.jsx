import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CharacterCard from './CharacterCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const Characters = ({ characters }) => {
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
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='characters'>
						{characters.map((character, idx) => (
							<CharacterCard key={idx} {...character} />
						))}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Characters

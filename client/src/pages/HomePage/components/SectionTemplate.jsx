import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AnimeCard from '../../../components/AnimeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const SectionTemplate = ({ animes, sectionName, link }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<Row>
				<Col>
					<div className='section-header'>
						<div className='section-title'>
							<h4>{sectionName}</h4>
						</div>
						<div className='section-button-all'>
							<Link to={link || '/'}>
								View All
								<FontAwesomeIcon icon={faLongArrowAltRight} />
							</Link>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				{animes.map((anime, idx) => (
					<Col lg={4} md={6} sm={6} key={idx}>
						<AnimeCard {...anime} />
					</Col>
				))}
			</Row>
		</div>
	)
}

export default SectionTemplate

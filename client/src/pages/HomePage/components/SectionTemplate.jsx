import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AnimeCard from '../../../components/AnimeCard'

const SectionTemplate = ({ animes, sectionName }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<Row>
				<Col lg={8} md={8} sm={8}>
					<div className='section-title'>
						<h4>{sectionName}</h4>
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
			<Row>
				{animes.map((anime, idx) => (
					<AnimeCard {...anime} key={idx} />
				))}
			</Row>
		</div>
	)
}

export default SectionTemplate

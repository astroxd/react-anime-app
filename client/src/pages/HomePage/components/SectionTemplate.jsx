import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AnimeCard from '../../../components/AnimeCard'

const SectionTemplate = ({ animes, sectionName }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<Row>
				<div className='section-header'>
					<div className='section-title'>
						<h4>{sectionName}</h4>
					</div>
					<div className='section-button-all'>
						<Link to='/'>
							View All
							<i className='fas fa-long-arrow-alt-right'></i>
						</Link>
					</div>
				</div>
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

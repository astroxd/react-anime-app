import { Link } from 'react-router-dom'

import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SideAnimeCard from '../../../components/SideAnimeCard'

const SideSection = ({ animes, sectionName, link }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<div className='section-header'>
				<div className='section-title'>
					<h5>{sectionName}</h5>
				</div>
				<div className='section-button-all'>
					<Link to={link || '/'}>
						View All
						<FontAwesomeIcon icon={faLongArrowAltRight} />
					</Link>
				</div>
			</div>
			{animes.map((anime, idx) => (
				<SideAnimeCard key={idx} {...anime} />
			))}
		</div>
	)
}

export default SideSection

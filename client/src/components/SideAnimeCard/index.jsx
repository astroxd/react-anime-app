import { Link } from 'react-router-dom'
import { getEpisodes } from '../../helpers/formattedAnimeDetails'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

//* Style
import './SideAnimeCard.css'

const SideAnimeCard = ({
	id,
	title,
	coverImage: { extraLarge: coverImage },
	bannerImage,
	episodes,
	popularity,
	nextAiringEpisode,
	status,
}) => {
	return (
		<Link to={`/anime/${id}`}>
			<div
				className='side-anime-card anime-card-image'
				style={{
					backgroundImage: `url(${bannerImage ?? coverImage})`,
				}}
			>
				<div className='anime-card-image-overlay episodes'>
					{getEpisodes(status, nextAiringEpisode, episodes)}
				</div>
				<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
					<FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
					{popularity.toLocaleString('en-US')}
				</div>
				<h5>{title.english ? title.english : title.romaji ?? 'NO TITLE'}</h5>
			</div>
		</Link>
	)
}

export default SideAnimeCard

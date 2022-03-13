import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

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
		<div
			className='side-anime-card anime-card-image'
			style={{
				backgroundImage: `url(${bannerImage ? bannerImage : coverImage})`,
			}}
		>
			<div className='anime-card-image-overlay episodes'>{`${
				nextAiringEpisode
					? nextAiringEpisode.episode
					: status === 'FINISHED'
					? episodes
					: '?'
			} / ${episodes ? episodes : '?'}`}</div>
			<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
				<FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
				{popularity}
			</div>
			<h5>
				<Link to={`/anime/${id}`} target='blank'>
					{title?.english ? title.english : title.romaji}
				</Link>
			</h5>
		</div>
	)
}

export default SideAnimeCard

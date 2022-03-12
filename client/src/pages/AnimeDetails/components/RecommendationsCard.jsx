import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const RecommendationsCard = ({
	node: {
		mediaRecommendation: {
			id,
			title,
			coverImage: { extraLarge: coverImage },
			bannerImage,
			episodes,
			popularity,
			nextAiringEpisode,
		},
	},
}) => {
	return (
		<div>
			<div
				className='side-anime-card anime-card-image'
				style={{
					backgroundImage: `url(${bannerImage ? bannerImage : coverImage})`,
				}}
			>
				<div className='anime-card-image-overlay episodes'>{`${
					nextAiringEpisode ? nextAiringEpisode.episode : episodes
				} / ${episodes}`}</div>
				<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
					<FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
					{popularity}
				</div>
				<h5>
					<Link to={`/anime/${id}`} target='blank'>
						{title.english ? title.english : title.romaji}
					</Link>
				</h5>
			</div>
		</div>
	)
}

export default RecommendationsCard

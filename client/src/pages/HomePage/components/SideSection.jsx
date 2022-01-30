import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
const SideSection = ({ animes, sectionName }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<div className='section-header'>
				<div className='section-title'>
					<h5>{sectionName}</h5>
				</div>
			</div>
			{/* TODO maybe convert to side anime card component */}
			{animes.map((anime, idx) => (
				<div
					key={idx}
					className='side-anime-card anime-card-image'
					style={{
						backgroundImage: `url(${
							anime.bannerImage ? anime.bannerImage : anime.coverImage.large
						})`,
					}}
				>
					<div className='anime-card-image-overlay episodes'>{`${
						anime.nextAiringEpisode
							? anime.nextAiringEpisode.episode
							: anime.status === 'FINISHED'
							? anime.episodes
							: '?'
					} / ${anime.episodes ? anime.episodes : '?'}`}</div>
					<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
						<FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
						{anime.popularity}
					</div>
					<h5>
						<Link to='/'>
							{anime.title?.english ? anime.title.english : anime.title.romaji}
						</Link>
					</h5>
				</div>
			))}
		</div>
	)
}

export default SideSection

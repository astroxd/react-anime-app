import { Link } from 'react-router-dom'

import { getEpisodes } from '../../helpers/formattedAnimeDetails'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

//* Style
import './AnimeCard.css'
import '../../Styles/Dropdown.css'

const AnimeCard = ({
	id,
	title,
	coverImage: image,
	episodes,
	nextAiringEpisode,
	popularity,
	genres,
	status,
	//* List entrie properties
	list_id,
	contextMenu: ContextMenu,
	actions,
}) => {
	return (
		<div className='anime-card'>
			<div className='anime-card-image'>
				{ContextMenu && (
					<ContextMenu list_id={list_id} anime_id={id} actions={actions} />
				)}
				<Link to={`/anime/${id}`}>
					<img
						src={image?.large ?? image}
						alt={`${
							title?.english ? title.english : title?.romaji ?? title
						} image`}
					/>

					{status && (
						<div className='anime-card-image-overlay episodes'>
							{getEpisodes(status, nextAiringEpisode, episodes)}
						</div>
					)}
					{popularity >= 0 && (
						<div className='anime-card-image-overlay view'>
							<FontAwesomeIcon icon={faEye} />
							{popularity.toLocaleString('en-US')}
						</div>
					)}
				</Link>
			</div>
			<div className='anime-card-text'>
				{genres && (
					<ul>
						{genres.map((genre, idx) => (
							<li key={idx}>
								<Link to={`/search?&genres=${genre}`}>{genre}</Link>
							</li>
						))}
					</ul>
				)}
				<h5>
					<Link to={`/anime/${id}`}>
						{title?.english ? title.english : title?.romaji ?? title}
					</Link>
				</h5>
			</div>
		</div>
	)
}

export default AnimeCard

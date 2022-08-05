/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { getEpisodes } from '../helpers/formattedAnimeDetails'
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
	contextMenu,
}) => {
	const navigate = useNavigate()

	return (
		<div className='anime-card'>
			<div className='anime-card-image'>
				<Link to={`/anime/${id}`} target='_blank'>
					<img
						src={image.large ?? image}
						alt={`${
							title.english ? title.english : title.romaji ?? title
						} image`}
					/>

					{status && (
						<div className='anime-card-image-overlay episodes'>
							{getEpisodes(status, nextAiringEpisode, episodes)}
						</div>
					)}
					{popularity && (
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
								<span
									onClick={() =>
										navigate('/search', { state: { genres: genre } })
									}
								>
									{genre}
								</span>
							</li>
						))}
					</ul>
				)}
				<h5>
					<Link to={`/anime/${id}`} target='_blank'>
						{title.english ? title.english : title.romaji ?? title}
					</Link>
				</h5>
			</div>
		</div>
	)
}

export default AnimeCard

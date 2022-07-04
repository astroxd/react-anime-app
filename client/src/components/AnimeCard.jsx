import { Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

const AnimeCard = ({
	id,
	title,
	coverImage: image,
	url,
	episodes,
	nextAiringEpisode,
	popularity,
	genres,
}) => {
	const navigate = useNavigate()

	return (
		// TODO create Anime Card component without Col specification
		<Col lg={4} md={6} sm={6}>
			<div className='anime-card'>
				<div className='anime-card-image'>
					<Link to={`/anime/${id}`} href={url} target='_blank' rel='noreferrer'>
						<img
							src={image.large}
							alt={`${title.english ? title.english : title.romaji} image`}
						/>
					</Link>
					<div className='anime-card-image-overlay episodes'>{`${
						nextAiringEpisode ? nextAiringEpisode.episode : '?'
					} / ${episodes ? episodes : '?'}`}</div>
					<div className='anime-card-image-overlay view'>
						<FontAwesomeIcon icon={faEye} />
						{popularity.toLocaleString('en-US')}
					</div>
				</div>
				<div className='anime-card-text'>
					<ul>
						{genres.map((genre, idx) => (
							<li key={idx}>
								{/* TODO Implement search by tag */}
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
					<h5>
						<Link
							to={`/anime/${id}`}
							href={url}
							target='_blank'
							rel='noreferrer'
						>
							{title.english ? title.english : title.romaji}
						</Link>
					</h5>
				</div>
			</div>
		</Col>
	)
}

export default AnimeCard

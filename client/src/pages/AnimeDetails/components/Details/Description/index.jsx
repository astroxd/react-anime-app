import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import FavoriteButton from '../FavoriteButton'
import AddToWatchlistButton from '../AddToWatchlistButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faEye } from '@fortawesome/free-solid-svg-icons'
import {
	getDateAired,
	getStatus,
	getAiringEpisode,
} from '../../../../../helpers/formattedAnimeDetails'

//* Style
import './Description.css'

const AnimeDescription = ({
	id,
	title,
	description,
	format,
	studios,
	startDate,
	endDate,
	status,
	genres,
	averageScore,
	popularity,
	duration,
	coverImage,
	favourites,
	episodes,
	nextAiringEpisode,
}) => {
	const [showDescription, setShowDescription] = useState(false)

	return (
		<div className='anime-details-content'>
			<Row>
				<Col lg={3}>
					<div className='anime-details-img'>
						<img src={coverImage.extraLarge} alt={title.romaji} />
						<div className='anime-card-image-overlay comments'>
							<FontAwesomeIcon icon={fasHeart} />
							{favourites.toLocaleString('en-US')}
						</div>
						<div className='anime-card-image-overlay view'>
							<FontAwesomeIcon icon={faEye} />
							{popularity.toLocaleString('en-US')}
						</div>
					</div>
				</Col>
				<Col lg={9}>
					<div className='anime-details-description'>
						<Row>
							<Col>
								<div className='anime-details-title'>
									<h3>{title.english ? title.english : title.romaji}</h3>
									<span>
										{Object.entries(title)
											.map(([, value]) => value)
											.join(', ')}
									</span>
								</div>
							</Col>
						</Row>
						<div className='description'>
							<p
								className={`${showDescription ? 'show' : ''}`}
								style={{ whiteSpace: 'pre-wrap' }}
							>
								{description?.replaceAll('<br>', '')}
							</p>
							<div
								className={`description-show-more ${
									showDescription ? 'hide' : ''
								}`}
								onClick={() => setShowDescription(!showDescription)}
							>
								{showDescription ? 'Show Less' : 'Show More'}
							</div>
						</div>
						<div className='anime-details-info'>
							<Row>
								<Col lg={6} md={6}>
									<ul>
										<li>
											<span>Type:</span>
											<p>{format}</p>
										</li>
										<li>
											<span>Studios:</span>
											<p>
												{studios.nodes.map((studio) => studio.name).join(', ')}
											</p>
										</li>
										<li>
											<span>Date Aired:</span>
											<p>{getDateAired(startDate, endDate)}</p>
										</li>
										<li>
											<span>Status:</span>
											<p>{getStatus(status)}</p>
										</li>
										{nextAiringEpisode && (
											<li>
												<span>Next:</span>
												<p>{getAiringEpisode(nextAiringEpisode?.airingAt)}</p>
											</li>
										)}
									</ul>
								</Col>
								<Col lg={6} md={6}>
									<ul>
										<li>
											<span>Genre:</span>
											<p>{genres.map((genre) => genre).join(', ')}</p>
										</li>
										<li>
											<span>Scores:</span>
											<p>{averageScore ?? '?'}%</p>
										</li>
										<li>
											<span>Episodes:</span>
											<p>{episodes ?? '?'}</p>
										</li>
										<li>
											<span>Duration:</span>
											<p>{duration ?? '?'} min/ep</p>
										</li>
									</ul>
								</Col>
							</Row>
						</div>
						<div className='anime-details-buttons'>
							<FavoriteButton
								animeId={id}
								coverImage={coverImage}
								title={title}
							/>
							<AddToWatchlistButton
								animeId={id}
								coverImage={coverImage}
								title={title}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AnimeDescription

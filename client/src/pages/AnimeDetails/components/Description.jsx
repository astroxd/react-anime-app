import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faHeart as fasHeart,
	faEye,
	faListUl,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const AnimeDescription = ({ object }) => {
	const {
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
	} = {
		...object,
	}

	const getDateAired = () => {
		const options = {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		}

		let formattedStartDate = '?'
		let formattedEndDate = '?'

		const { year: sYear, month: sMonth, day: sDay } = startDate
		const { year: eYear, month: eMonth, day: eDay } = endDate

		if (sYear !== null) {
			const startDateObj = new Date(sYear, sMonth - 1, sDay)

			formattedStartDate = startDateObj.toLocaleDateString('en-US', options)
		}
		if (eYear !== null) {
			const endDateObj = new Date(eYear, eMonth - 1, eDay)

			formattedEndDate = endDateObj.toLocaleDateString('en-US', options)
		}

		return `${formattedStartDate} to ${formattedEndDate}`
	}

	const getStatus = () => {
		switch (status) {
			case 'RELEASING':
				return 'Airing'
			case 'NOT_YET_RELEASED':
				return 'Not Yet Aired'
			case 'FINISHED':
				return 'Finished'
			case 'CANCELLED':
				return 'Cancelled'
			default:
				return 'Paused'
		}
	}

	const [showDescription, setShowDescription] = useState(false)
	return (
		<div className='anime-details-content'>
			<Row>
				<Col lg={3}>
					<div className='anime-details-img'>
						<img src={coverImage.extraLarge} alt={title.romaji} />
						<div className='anime-card-image-overlay comments'>
							<FontAwesomeIcon icon={fasHeart} />
							{favourites}
						</div>
						<div className='anime-card-image-overlay view'>
							<FontAwesomeIcon icon={faEye} />
							{popularity}
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
											.map(([_, value]) => value)
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
								{description.replaceAll('<br>', '')}
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
											<p>{getDateAired()}</p>
										</li>
										<li>
											<span>Status:</span>
											<p>{getStatus()}</p>
										</li>
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
											<p>{averageScore ? averageScore : '?'}%</p>
										</li>

										<li>
											<span>Duration:</span>
											<p>{duration ? duration : '?'} min/ep</p>
										</li>

										<li>
											<span>Views:</span>
											<p>{popularity}</p>
										</li>
									</ul>
								</Col>
							</Row>
						</div>
						<div className='anime-details-buttons'>
							<button className='primary-btn'>
								<FontAwesomeIcon icon={faHeart} />
								{' Add to favorite list'}
							</button>
							<button className='primary-btn'>
								<FontAwesomeIcon icon={faListUl} />
								{' Add to watchlist'}
							</button>
							{/* <Link to='/'>
								<span>Add to watchlist</span>
								<i className='fas fa-angle-right'></i>
							</Link> */}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AnimeDescription

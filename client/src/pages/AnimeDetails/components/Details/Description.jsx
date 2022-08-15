import { Col, Row } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faEye } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
	getDateAired,
	getStatus,
	getAiringEpisode,
} from '../../../../helpers/formattedAnimeDetails'
import { authAxios } from '../../../../helpers/auth-axios'
import AuthContext from '../../../../context/AuthProvider'
import { SuccessToast } from '../../../../components/Toast'

import AddToWatchlistButton from './AddToWatchlistButton'
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

	const { auth, loading } = useContext(AuthContext)

	const [userLists, setUserLists] = useState([])

	const getUserLists = async () => {
		const response = await authAxios.get(`/lists/${auth.id}`)
		if (response.data) setUserLists(response.data)
	}

	const [listsWithAnime, setListsWithAnime] = useState([])
	const [codeList, setCodeList] = useState()

	const getAnimeLists = async () => {
		const response = await authAxios.get(`/lists/list/anime/${auth.id}/${id}`)
		if (response.data) {
			setListsWithAnime(response.data.lists)
			setCodeList(response.data.codeList)
		}
	}

	const [isFavorite, setIsFavorite] = useState(false)

	const checkIfFavorite = async () => {
		const response = await authAxios.get(`/favorites/anime/${auth.id}/${id}`)
		if (response.data) {
			setIsFavorite(response.data.data)
		}
	}

	const handleFavorite = async () => {
		if (isFavorite) {
			const response = await authAxios.delete(`/favorites/${auth.id}/${id}`)
			if (response.data) {
				SuccessToast(response.data.message)
			}
			await checkIfFavorite()
			return
		}
		const response = await authAxios.post(`/favorites/${auth.id}`, {
			anime_id: id,
			anime_cover: coverImage.large,
			anime_title: title.english ? title.english : title.romaji,
		})
		if (response.data) {
			SuccessToast(response.data.message)
		}
		await checkIfFavorite()
	}

	useEffect(() => {
		if (!loading && auth?.id) {
			getUserLists()
			getAnimeLists()
			checkIfFavorite()
		}
	}, [loading])

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
							<button className='primary-btn favorite' onClick={handleFavorite}>
								<FontAwesomeIcon icon={isFavorite ? fasHeart : faHeart} />
							</button>
							<AddToWatchlistButton
								userLists={userLists}
								listsWithAnime={listsWithAnime}
								codeList={codeList}
								anime_id={id}
								coverImage={coverImage}
								title={title}
								refresh={getAnimeLists}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AnimeDescription

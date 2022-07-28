/* eslint-disable no-unused-vars */
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faHeart as fasHeart,
	faEye,
	faListUl,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
	getDateAired,
	getStatus,
} from './../../../helpers/formattedAnimeDetails'
import { useClickOutside } from '../../../components/useClickOutsideHook'
import { authAxios } from '../../../helpers/auth-axios'
import AuthContext from '../../../context/AuthProvider'
import { useContext } from 'react'
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
}) => {
	const [showDescription, setShowDescription] = useState(false)
	const [showWatchlistMenu, setShowWatchlistMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowWatchlistMenu(false)
	})

	const { auth, loading } = useContext(AuthContext)

	const [userLists, setUserLists] = useState([])

	const getUserLists = async () => {
		const response = await authAxios.get(`/lists/${auth.id}`)
		console.log(response.data)
		if (response.data) setUserLists(response.data)
	}

	const addToList = async (list_id) => {
		const response = await authAxios.post(`/list/${list_id}`, {
			user_id: auth.id,
			anime_id: id,
			anime_cover: coverImage.medium,
		})
		if (response.data) console.log(response.data)
		await getAnimeLists()
	}

	const removeFromList = async (list_id, reload = true) => {
		const response = await authAxios.delete(`/lists/delete/${list_id}/${id}`)
		if (response.data?.message) {
			console.log(response.data.message)
			if (reload) await getAnimeLists()
			return true
		}
		await getAnimeLists()
		return false
	}

	const addToStatusList = async (list_id) => {
		const isRemoved = await removeFromList(codeList.list_id, false)
		if (isRemoved) {
			addToList(list_id)
		}
	}

	const [listsWithAnime, setListsWithAnime] = useState([])
	const [codeList, setCodeList] = useState()

	const getAnimeLists = async () => {
		const response = await authAxios.get(`/list/${auth.id}/${id}`)
		console.log(response.data)
		if (response.data) {
			setListsWithAnime(response.data.lists)
			setCodeList(response.data.codeList)
		}
	}

	useEffect(() => {
		if (!loading) {
			getUserLists()
			getAnimeLists()
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
											<span>Episodes:</span>
											<p>{episodes}</p>
										</li>
										<li>
											<span>Duration:</span>
											<p>{duration ? duration : '?'} min/ep</p>
										</li>
									</ul>
								</Col>
							</Row>
						</div>
						<div className='anime-details-buttons'>
							<button className='primary-btn favorite'>
								<FontAwesomeIcon icon={faHeart} />
							</button>
							<div className='add-to-watchlist' ref={domNode}>
								<button
									className='primary-btn text'
									onClick={() => setShowWatchlistMenu(!showWatchlistMenu)}
								>
									Add to watchlist
								</button>
								<button
									className='primary-btn icon'
									onClick={() => setShowWatchlistMenu(!showWatchlistMenu)}
								>
									<FontAwesomeIcon icon={faChevronDown} />
								</button>
								<div
									className={`dropdown-menu ${showWatchlistMenu ? 'show' : ''}`}
								>
									<ul>
										<li className='dropdown-menu-item no-hover'>Set as:</li>
										{userLists.map((list, idx) => {
											const isInList = listsWithAnime.some(
												(listWithAnime) =>
													listWithAnime.list_id === list.list_id
											)
											return (
												<li
													key={idx}
													className={`dropdown-menu-item`}
													style={{ backgroundColor: isInList ? 'red' : '' }}
													onClick={() => {
														if (isInList) {
															console.log('remove from list')
															removeFromList(list.list_id)
														} else if (list?.code && codeList?.code) {
															addToStatusList(list.list_id)
															console.log('remove from and add to status list')
														} else {
															console.log('add to list')
															addToList(list.list_id)
														}
													}}
												>
													{list.name}
												</li>
											)
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AnimeDescription

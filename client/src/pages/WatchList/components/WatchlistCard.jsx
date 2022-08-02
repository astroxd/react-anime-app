/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { jikanAxios } from '../../../helpers/jikan-axios'
import cover1 from './../../../assets/images/cover1.jpg'
import cover2 from './../../../assets/images/cover2.jpg'
import cover3 from './../../../assets/images/cover3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useClickOutsideMultiple } from '../../../components/useClickOutsideHook'

const WatchlistCard = ({ anime, idx }) => {
	const [showMenuButton, setShowMenuButton] = useState(false)
	const covers = [cover1, cover2, cover3]

	// const getAnimeGenres = async () => {
	// 	const result = await jikanAxios(`/anime/${anime.mal_id}`)
	// 	if (result && result.data) {
	// 		console.log(result.data.genres)
	// 		setGenres(result.data.genres)
	// 	}
	// }

	// useEffect(() => {
	// 	getAnimeGenres()
	// 	return () => {}
	// }, [])
	console.log(anime)
	let domNode = useClickOutsideMultiple(() => {
		setShowMenuButton(false)
	})

	return (
		<Col xl={3} lg={4} md={6} sm={6}>
			<div className='anime-card'>
				<div className='anime-card-image'>
					<Link
						to={`/anime/${anime.anime_id}`}
						href={anime.url} //* url is not saved
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={anime.anime_cover}
							alt={`${anime.title} image`} //* save title
						/>
					</Link>
					<div
						ref={domNode}
						className={`anime-card-image-overlay more-options ${
							showMenuButton ? 'show' : ''
						}`}
						onClick={() => {
							setShowMenuButton(!showMenuButton)
						}}
					>
						<FontAwesomeIcon icon={faEllipsisH} />
						<div
							className={`more-options-menu ${showMenuButton ? 'show' : ''}`}
						>
							<ul>
								<li className='more-options-menu-option'>Remove</li>
								<li className='more-options-menu-option'>Remove</li>
								<li className='more-options-menu-option'>Remove</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='anime-card-text'>
					<h5>
						<Link
							to={`/anime/${anime.anime_id}`}
							href={anime.url}
							target='_blank'
							rel='noreferrer'
						>
							{anime.title}
						</Link>
					</h5>
				</div>
			</div>
		</Col>
	)
}

export default WatchlistCard

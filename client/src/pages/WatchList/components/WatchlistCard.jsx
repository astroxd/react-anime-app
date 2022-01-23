import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jikanAxios } from '../../../helpers/jikan-axios'
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

	const [genres, setGenres] = useState([])

	const getAnimeGenres = async () => {
		const result = await jikanAxios(`/anime/${anime.mal_id}`)
		if (result && result.data) {
			console.log(result.data.genres)
			setGenres(result.data.genres)
		}
	}

	useEffect(() => {
		getAnimeGenres()
		return () => {}
	}, [])

	let domNode = useClickOutsideMultiple(() => {
		setShowMenuButton(false)
	})

	return (
		<Col xl={3} lg={4} md={6} sm={6}>
			<div className='anime-card'>
				<div className='anime-card-image'>
					<Link
						to={`/anime/${anime.mal_id}`}
						href={anime.url}
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={covers[Math.floor(Math.random() * covers.length)]}
							alt={`${anime.title} image`}
						/>
					</Link>
					<div className='anime-card-image-overlay episodes'>{`${anime.episodes} / ${anime.episodes}`}</div>
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

					<div className='anime-card-image-overlay view'>
						<FontAwesomeIcon icon={faEye} />
						<span>{anime.members}</span>
					</div>
				</div>
				<div className='anime-card-text'>
					<ul>
						{genres.map((genre, idx) => (
							<li key={idx}>
								{/* TODO Implement search by tag */}
								<Link to='/'>{genre.name}</Link>
							</li>
						))}
					</ul>
					<h5>
						<Link
							to={`/anime/${anime.mal_id}`}
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

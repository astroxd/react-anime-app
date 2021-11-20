import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WatchlistCard = ({ anime, idx, reset }) => {
	const [showMenuButton, setShowMenuButton] = useState(false)

	useEffect(() => {
		if (showMenuButton) {
			setShowMenuButton(false)
		}
		return () => {}
	}, [reset])

	return (
		<Col lg={3} md={4} sm={6}>
			<div className='anime-card'>
				<div className='anime-card-image'>
					<img src={anime.image_url} alt={`${anime.title} image`} />
					<div className='episodes'>{`${anime.episodes} / ${anime.episodes}`}</div>
					<div
						className={`more-options ${showMenuButton ? 'show' : ''}`}
						onClick={() => {
							setShowMenuButton(!showMenuButton)
						}}
					>
						<i className='fas fa-ellipsis-h'></i>
					</div>
					<div className={`more-options-menu ${showMenuButton ? 'show' : ''}`}>
						<ul>
							<li className='more-options-menu-option'>Remove</li>
							<li>item</li>
							<li>item</li>
						</ul>
					</div>
					<div className='view'>
						<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
						{anime.members}
					</div>
				</div>
				<div className='anime-card-text'>
					<ul>
						<li>genere</li>
						{/* {anime.genres.map((genre, idx) => (
										<li key={idx}>{genre.name}</li>
									))} */}
					</ul>
					<h5>
						<Link
							to={`/anime/${anime.id}`}
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

/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getEpisodes } from '../helpers/formattedAnimeDetails'
import { useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
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
	contextMenu,
}) => {
	const navigate = useNavigate()

	const [showContextMenu, setShowContextMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowContextMenu(false)
	})

	return (
		<div className='anime-card'>
			<div className='anime-card-image'>
				{contextMenu && (
					<div
						className='anime-card-image-overlay more-options'
						onClick={() => setShowContextMenu(!showContextMenu)}
						ref={domNode}
					>
						<FontAwesomeIcon icon={faBars} />
						<div className={`dropdown-menu ${showContextMenu ? 'show' : ''}`}>
							<ul>
								{contextMenu.map(({ name, action }, idx) => (
									<li
										className='dropdown-menu-item'
										key={idx}
										onClick={() => action(list_id, id)}
									>
										{name}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
				<Link to={`/anime/${id}`}>
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

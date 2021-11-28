import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jikanAxios } from '../helpers/jikan-axios'
import cover1 from '../assets/images/cover1.jpg'
import cover2 from '../assets/images/cover2.jpg'
import cover3 from '../assets/images/cover3.jpg'
const AnimeCard = ({
	mal_id: id,
	title,
	image_url: cover,
	url,
	episodes,
	members,
}) => {
	const covers = [cover1, cover2, cover3]

	const [genres, setGenres] = useState([])

	const getAnimeGenres = async () => {
		const result = await jikanAxios(`/anime/${id}`)
		if (result && result.data) {
			console.log(result.data.genres)
			setGenres(result.data.genres)
		}
	}

	useEffect(() => {
		getAnimeGenres()
	}, [])

	return (
		<Col lg={4} md={6} sm={6}>
			<div className='anime-card'>
				<div className='anime-card-image'>
					<img
						src={covers[Math.floor(Math.random() * covers.length)]}
						alt={`${title} image`}
					/>
					<div className='anime-card-image-overlay episodes'>{`${episodes} / ${episodes}`}</div>
					<div className='anime-card-image-overlay view'>
						<i className='fa fa-eye'></i>
						{members}
					</div>
				</div>
				<div className='anime-card-text'>
					<ul>
						{genres.map((genre, idx) => (
							<li key={idx}>{genre.name}</li>
						))}
					</ul>
					<h5>
						<Link
							to={`/anime/${id}`}
							href={url}
							target='_blank'
							rel='noreferrer'
						>
							{title}
						</Link>
					</h5>
				</div>
			</div>
		</Col>
	)
}

export default AnimeCard

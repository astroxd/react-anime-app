import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jikanAxios } from '../helpers/jikan-axios'
const AnimeCard = ({
	mal_id: id,
	title,
	image_url: cover,
	url,
	episodes,
	members,
}) => {
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
					<img src={cover} alt={`${title} image`} />
					<div className='episodes'>{`${episodes} / ${episodes}`}</div>
					<div className='view'>
						<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
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

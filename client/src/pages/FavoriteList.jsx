import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { authAxios } from '../helpers/auth-axios'
import { jikanAxios } from '../helpers/jikan-axios'
const FavoriteList = () => {
	const [animes, setAnimes] = useState([])

	const getFavoriteList = async () => {
		const result = await authAxios.get('/favorite/list')

		//! If it consume much resources watch this
		//! https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/

		const asyncRes = await Promise.all(
			result.data.map(async (anime) => {
				const result = await jikanAxios.get(`/anime/${anime.mal_id}`)
				return {
					id: result.data.mal_id,
					title: result.data.title,
					cover: result.data.image_url,
					synopsis: result.data.synopsis,
					status: result.data.status,
				}
			})
		)

		setAnimes(asyncRes)
		console.log(asyncRes)
	}

	const removeFromFavorite = (e, id) => {
		e.preventDefault()
		authAxios
			.delete(`/favorite/delete/${id}`)
			.then((result) => {
				console.log(result)
				setAnimes(animes.filter((anime) => anime.id !== id))
			})
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getFavoriteList()
	}, [])
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{animes.map((anime, idx) => (
				<Link
					to={`/anime/${anime.id}`}
					target='_blank'
					key={idx}
					className='watchlist-anime-card'
				>
					<h2 className='title'>{anime.title}</h2>

					<h3>{anime.id}</h3>
					<h3>{anime.status}</h3>
					<img src={anime.cover} alt='' className='cover' />
					<div
						className='buttons'
						style={{
							marginTop: '1rem',
						}}
					>
						<button onClick={(e) => removeFromFavorite(e, anime.id)}>
							Remove from Favorites
						</button>
					</div>
				</Link>
			))}
		</div>
	)
}

export default FavoriteList

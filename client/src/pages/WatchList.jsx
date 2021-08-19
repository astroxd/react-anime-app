import { useEffect, useState } from 'react'
import { authAxios } from './../helpers/auth-axios'
import { jikanAxios } from './../helpers/jikan-axios'
import { Link } from 'react-router-dom'
const WatchList = () => {
	const [Anime, setAnime] = useState([])

	const GetWatchList = async () => {
		const result = await authAxios.get('/watchlist/list')

		//! If it consume much resources watch this
		//! https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/

		const asyncRes = await Promise.all(
			result.data.map(async (anime) => {
				const result = await jikanAxios.get(`/anime/${anime.id}`)
				return {
					id: result.data.mal_id,
					title: result.data.title,
					cover: result.data.image_url,
					synopsis: result.data.synopsis,
					status: result.data.status,
				}
			})
		)

		setAnime(asyncRes)
	}

	const removeFromWatchList = (e, id) => {
		e.preventDefault()
		authAxios
			.delete(`/watchlist/delete/${id}`)
			.then(() => setAnime(Anime.filter((anime) => anime.id !== id)))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		GetWatchList()
	}, [])
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{Anime.map((anime, idx) => (
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
						<button onClick={(e) => removeFromWatchList(e, anime.id)}>
							Remove from watchlist
						</button>
					</div>
				</Link>
			))}
		</div>
	)
}

export default WatchList

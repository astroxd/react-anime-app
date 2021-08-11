import { useEffect, useState } from 'react'
import axios from 'axios'

const WatchList = () => {
	const [AnimeDetails, setAnimeDetails] = useState([])

	const [Anime, setAnime] = useState([])

	const GetWatchList = async () => {
		const result = await axios.get('http://localhost:3001/api/watchlist/list')

		//! If it consume much resources watch this
		//! https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/

		const asyncRes = await Promise.all(
			result.data.map(async (anime) => {
				const result = await axios.get(
					`https://api.jikan.moe/v3/anime/${anime.id}`
				)
				console.log(result)
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

	useEffect(() => {
		console.log('useEffect')
		GetWatchList()
	}, [])
	return (
		<div>
			{Anime.map((anime) => (
				<>
					<h1 key={anime.id}>{anime.title}</h1>
					<h3>{anime.id}</h3>
					<h3>{anime.status}</h3>
					<img src={anime.cover} alt='' />
				</>
			))}
		</div>
	)
}

export default WatchList

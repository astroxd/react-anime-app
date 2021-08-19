import { useEffect, useState } from 'react'
import axios from 'axios'
import { authAxios } from './../helpers/auth-axios'
import { jikanAxios } from './../helpers/jikan-axios'
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

	useEffect(() => {
		GetWatchList()
	}, [])
	return (
		<div>
			{Anime.map((anime, idx) => (
				<div key={idx}>
					<h1>{anime.title}</h1>
					<h3>{anime.id}</h3>
					<h3>{anime.status}</h3>
					<img src={anime.cover} alt='' />
				</div>
			))}
		</div>
	)
}

export default WatchList

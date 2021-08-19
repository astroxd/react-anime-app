import { useState, useEffect } from 'react'
// import Axios from 'axios'
import { jikanAxios } from './../helpers/jikan-axios'
import AnimeCard from '../components/AnimeCard'

const TopAnimeList = () => {
	const [Animes, setAnimes] = useState([])

	useEffect(() => {
		async function getTopAnimes() {
			const result = await jikanAxios.get('/top/anime/1/bypopularity')
			setAnimes(result.data.top)
		}
		getTopAnimes()
	}, [])

	return (
		<div className='anime-list'>
			{Animes.map((anime) => (
				<AnimeCard key={anime.mal_id} {...anime} />
			))}
		</div>
	)
}

export default TopAnimeList

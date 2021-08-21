import { useState, useEffect } from 'react'
import { jikanAxios } from './../helpers/jikan-axios'
import AnimeCard from '../components/AnimeCard'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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
			<Button variant='danger'>caca</Button>
			{Animes.map((anime) => (
				<AnimeCard key={anime.mal_id} {...anime} />
			))}
		</div>
	)
}

export default TopAnimeList

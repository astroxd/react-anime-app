import { useEffect } from 'react'
import { useState } from 'react'
import { Row } from 'react-bootstrap'
import { jikanAxios } from '../../../helpers/jikan-axios'
import WatchlistCard from './WatchlistCard'

const WatchingList = () => {
	const [Anime, setAnime] = useState([])

	const GetWatchList = async () => {
		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result && result.data && result.data.top) {
			setAnime(result.data.top.slice(0, 2))
		}
	}

	useEffect(() => {
		GetWatchList()
	}, [])
	return (
		<Row>
			{Anime.map((anime, idx) => (
				<WatchlistCard anime={anime} idx={idx} key={idx} />
			))}
		</Row>
	)
}

export default WatchingList

import { useEffect } from 'react'
import { useState } from 'react'
import { Row } from 'react-bootstrap'
import SectionWithSearch from '../../../components/SectionWithSearch'
// import { jikanAxios } from '../../../helpers/jikan-axios'
import WatchList from './WatchList'
import WatchlistCard from './WatchlistCard'

const WatchingList = () => {
	const [Anime, setAnime] = useState([])
	const [AllAnime, setAllAnime] = useState([])

	const [ShowMore, setShowMore] = useState(true)

	// const GetWatchList = async () => {
	// 	const result = await jikanAxios.get('/top/anime/1/bypopularity')
	// 	if (result && result.data && result.data.top) {
	// 		setAllAnime(result.data.top.slice(0, 10))
	// 		setAnime(result.data.top.slice(0, 2))
	// 	}
	// }
	const FetchMore = () => {
		console.log('fetch more')
	}

	const Search = (query) => {
		console.log('search', query)
		setAnime(AllAnime)
		// TODO when searching remove show more button
		if (query.length > 0) {
			setShowMore(false)
		} else {
			setShowMore(true)
		}
	}
	// useEffect(() => {
	// 	GetWatchList()
	// }, [])
	return (
		<SectionWithSearch
			sectionTitle={'Watching'}
			Component={WatchList}
			Anime={Anime}
			Search={Search}
			ShowMore={ShowMore ? FetchMore : null}
		/>
		// <Row>
		// 	{Anime.map((anime, idx) => (
		// 		<WatchlistCard anime={anime} idx={idx} key={idx} />
		// 	))}
		// </Row>
	)
}

export default WatchingList

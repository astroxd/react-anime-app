import { useState } from 'react'
import SectionWithSearch from '../../../components/SectionWithSearch'
import WatchList from './WatchList'

const PlanningList = () => {
	const [Anime, setAnime] = useState([])
	// eslint-disable-next-line no-unused-vars
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
			sectionTitle={'Planning'}
			Component={WatchList}
			Anime={Anime}
			Search={Search}
			ShowMore={ShowMore ? FetchMore : null}
		/>
	)
}

export default PlanningList

import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import WatchList from './WatchList'
import SectionWithSearch from '../../../components/SectionWithSearch'
// import { jikanAxios } from '../../../helpers/jikan-axios'

import WatchlistCard from './WatchlistCard'

const CompletedList = () => {
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

	useEffect(() => {
		// GetWatchList()
	}, [])
	return (
		<SectionWithSearch
			sectionTitle={'Completed'}
			className={'completed'}
			Component={WatchList}
			Anime={Anime}
			Search={Search}
			ShowMore={ShowMore ? FetchMore : null}
		/>
		// <Row>
		// 	{Anime.map((anime, idx) => (
		// 		<WatchlistCard anime={anime} idx={idx} key={idx} />
		// 	))}
		// 	<div>
		// 		<div className='show-more'>
		// 			<span onClick={FetchMore}>Show More</span>
		// 		</div>
		// 	</div>
		// </Row>
		// <Col>
		// 	<Row>
		// 		{Anime.map((anime, idx) => (
		// 			<WatchlistCard anime={anime} idx={idx} key={idx} />
		// 		))}
		// 	</Row>
		// 	<Row>
		// 		<div>show more</div>
		// 	</Row>
		// </Col>
	)
}

export default CompletedList

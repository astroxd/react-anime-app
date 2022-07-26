import { useEffect, useState } from 'react'
import SectionWithSearch from '../../../components/SectionWithSearch'
import { authAxios } from '../../../helpers/auth-axios'
// import { jikanAxios } from '../../../helpers/jikan-axios'
import WatchList from './WatchList'

const List = ({ list_id: id, name }) => {
	const [Anime, setAnime] = useState([])

	const [AllAnime, setAllAnime] = useState([])

	const [ShowMore, setShowMore] = useState(true)

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
	//* Fetch all animes
	const getListEntries = async () => {
		const response = await authAxios.get(`/lists/${id}`)
		console.log(response.data)
		if (response.data) setAllAnime(response.data)
	}

	useEffect(() => {
		getListEntries()
	}, [])
	return (
		<SectionWithSearch
			sectionTitle={name}
			Component={WatchList}
			Animes={Anime}
			Search={Search}
			ShowMore={ShowMore ? FetchMore : null}
		/>
	)
}

export default List

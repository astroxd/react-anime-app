import axios from 'axios'
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
		const response = await authAxios.get(`/list/${id}`, { page: 1 })
		console.log(response)
		if (response.data) {
			setAllAnime(response.data)
			setAnime(response.data)
		}
	}

	useEffect(() => {
		console.log('list')
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

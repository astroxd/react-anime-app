import { useEffect, useState } from 'react'
import SectionWithSearch from '../../../components/SectionWithSearch'
import { authAxios } from '../../../helpers/auth-axios'

const List = ({ list_id: id, name }) => {
	const [Anime, setAnime] = useState([])

	const [AllAnime, setAllAnime] = useState([])

	const [ShowMore, setShowMore] = useState(true)

	const [page, setPage] = useState(1)

	const FetchMore = async () => {
		setPage((page) => page + 1)
	}

	const Search = (query) => {
		console.log('search', query)
		setAnime(AllAnime)
		// TODO create search route and use LIKE
		if (query.length > 0) {
			setShowMore(false)
		} else {
			setShowMore(true)
		}
	}
	//* Fetch all animes
	const getListEntries = async () => {
		console.log(page)
		const response = await authAxios.post(`/lists/list/${id}`, { page })
		console.log(response)
		if (response.data) {
			const { data, lastPage } = response.data
			setAllAnime(response.data)
			setAnime([...Anime, ...data])
			page === lastPage ? setShowMore(false) : setShowMore(true)
		}
	}

	useEffect(() => {
		console.log('list')
		getListEntries()
	}, [page])
	return (
		<>
			<SectionWithSearch
				sectionTitle={name}
				Animes={Anime}
				Search={Search}
				ShowMore={ShowMore ? FetchMore : null}
			/>
		</>
	)
}

export default List

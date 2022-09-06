import { useEffect, useState } from 'react'
import SectionWithSearch from '../../../components/SectionWithSearch'
import { SuccessToast } from '../../../components/Toast'
import { authAxios } from '../../../helpers/auth-axios'
import ListEntrieActionsMenu from './ListEntrieActionsMenu'

const List = ({ listId: id, name }) => {
	const [Anime, setAnime] = useState([])

	const [ShowMore, setShowMore] = useState(true)

	const [page, setPage] = useState(1)

	const [loading, setLoading] = useState(false)

	const FetchMore = async () => {
		setPage((page) => page + 1)
		await getListEntries(false, page + 1)
	}

	const Search = async (query) => {
		setLoading(true)

		if (query.length > 0) {
			setShowMore(false)

			const result = await authAxios.get(`/listentrie/${id}/?q=${query}`)
			if (result.data) {
				setAnime(result.data.data)
			}

			setLoading(false)
		} else {
			setShowMore(true)
			setPage(1)
			await getListEntries(true, 1)
		}
	}
	//* Fetch all animes
	const getListEntries = async (replace = false, page = 1) => {
		setLoading(true)
		const response = await authAxios.get(`/listentrie/${id}/${page}`)
		if (response.data) {
			const { data, lastPage } = response.data

			replace ? setAnime(data) : setAnime([...Anime, ...data])
			page === lastPage ? setShowMore(false) : setShowMore(true)

			setLoading(false)
		}
	}

	const removeFromList = async (listId, animeId) => {
		const response = await authAxios.delete(`/listentrie/${listId}/${animeId}`)
		if (response.data?.message) {
			SuccessToast(response.data.message)
			await getListEntries(true)
		}
	}

	const actions = [{ name: 'Remove', action: removeFromList }]

	useEffect(() => {
		getListEntries()
	}, [])

	return (
		<SectionWithSearch
			sectionTitle={name}
			Animes={Anime}
			Search={Search}
			ShowMore={ShowMore ? FetchMore : null}
			Loading={loading}
			ListID={id}
			Menu={ListEntrieActionsMenu}
			Actions={actions}
		/>
	)
}

export default List

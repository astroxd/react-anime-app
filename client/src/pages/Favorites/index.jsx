import { useContext, useEffect, useState } from 'react'
import SectionWithSearch from '../../components/SectionWithSearch'
import AuthContext from '../../context/AuthProvider'
import { authAxios } from '../../helpers/auth-axios'
const FavoriteList = () => {
	const { auth, loading: userLoading } = useContext(AuthContext)

	const [animes, setAnimes] = useState([])
	const [loading, setLoading] = useState(false)
	const [ShowMore, setShowMore] = useState(true)
	const [page, setPage] = useState(1)

	const FetchMore = async () => {
		setPage((page) => page + 1)
		await getUserFavorites(false, page + 1)
	}
	const Search = async (query) => {
		setLoading(true)

		if (query.length > 0) {
			setShowMore(false)

			const result = await authAxios.get(`/favorites/${auth.id}/?q=${query}`)
			if (result?.data) {
				setAnimes(result.data)
			}

			setLoading(false)
		} else {
			setShowMore(true)
			setPage(1)
			await getUserFavorites(true, 1)
		}
	}

	const getUserFavorites = async (replace = false, page = 1) => {
		setLoading(true)
		const response = await authAxios.get(`/favorites/${auth.id}/${page}`)
		if (response.data) {
			const { data, lastPage } = response.data
			console.log(data)
			replace ? setAnimes(data) : setAnimes([...animes, ...data])
			page === lastPage ? setShowMore(false) : setShowMore(true)

			setLoading(false)
		}
	}

	useEffect(() => {
		if (!userLoading) {
			getUserFavorites()
		}
	}, [userLoading])

	return (
		<section className='favorites'>
			<SectionWithSearch
				sectionTitle={'Favorites'}
				Animes={animes}
				Search={Search}
				ShowMore={ShowMore ? FetchMore : null}
				Loading={loading}
			/>
		</section>
	)
}

export default FavoriteList
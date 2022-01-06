import { useEffect, useState } from 'react'
import { jikanAxios } from '../../helpers/jikan-axios'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

const Search = ({ searchQuery }) => {
	const [Results, setResults] = useState([])

	const updateResults = (results) => {
		setResults(results)
	}

	// TODO just for preset animes
	const getTopAnimes = async () => {
		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result?.data?.top) {
			setResults(result.data.top.slice(0, 9))
		}
	}

	useEffect(() => {
		getTopAnimes()
		return () => {}
	}, [])

	return (
		<section className='search-page'>
			<SearchBar updateResults={updateResults} searchQuery={searchQuery} />
			<SearchResults anime={Results} />
		</section>
	)
}

export default Search

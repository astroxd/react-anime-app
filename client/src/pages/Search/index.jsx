import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

const Search = () => {
	const location = useLocation()
	const searchQuery = location.search ? location.search : ''

	const [Results, setResults] = useState([])

	const updateResults = (results) => {
		setResults(results)
	}

	const [page, setPage] = useState(1)

	const updatePage = (pageNumber) => {
		setPage(pageNumber)
	}

	return (
		<section className='search-page'>
			<h2>{searchQuery}</h2>
			<SearchBar
				updateResults={updateResults}
				query={searchQuery.slice(7)}
				page={page}
				updatePage={updatePage}
			/>
			<SearchResults
				animes={Results}
				query={searchQuery.slice(7)}
				page={page}
				updatePage={updatePage}
			/>
		</section>
	)
}

export default Search

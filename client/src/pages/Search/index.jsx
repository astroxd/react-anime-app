import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

const Search = () => {
	const location = useLocation()
	// const searchQuery = location.search ? location.search : ''

	const [searchQuery, setSearchQuery] = useState('')

	const updateQuery = (query) => {
		setSearchQuery(query)
	}

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
			<h1>{location.search}</h1>
			<h2>{searchQuery}</h2>
			<SearchBar
				updateResults={updateResults}
				queryObj={location}
				updateQuery={updateQuery}
				page={page}
				updatePage={updatePage}
			/>
			<SearchResults
				animes={Results}
				query={searchQuery}
				page={page}
				updatePage={updatePage}
			/>
		</section>
	)
}

export default Search

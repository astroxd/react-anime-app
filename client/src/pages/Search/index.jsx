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

	return (
		<section className='search-page'>
			<h2>{searchQuery}</h2>
			<SearchBar updateResults={updateResults} query={searchQuery.slice(7)} />
			<SearchResults animes={Results} />
		</section>
	)
}

export default Search

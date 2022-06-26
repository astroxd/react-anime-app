import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import useSearch from './components/useSearch'

const Search = () => {
	const location = useLocation()
	// const searchQuery = location.search ? location.search : ''

	const [query, setQuery] = useState('')

	const updateQuery = (query) => {
		console.log(query)
		setQuery(query)
	}

	const [page, setPage] = useState(1)

	const updatePage = (pageNumber) => {
		setPage(pageNumber)
	}

	const { loading, hasMore, error, results } = useSearch(query, page)

	return (
		<section className='search-page'>
			<h1>{location.search}</h1>
			<h2>{query}</h2>
			<SearchBar
				// updateResults={updateResults}
				// queryObj={location}
				updateQuery={updateQuery}
				// page={page}
				// updatePage={updatePage}
			/>
			<SearchResults
				animes={results}
				query={query}
				page={page}
				updatePage={updatePage}
			/>
		</section>
	)
}

export default Search

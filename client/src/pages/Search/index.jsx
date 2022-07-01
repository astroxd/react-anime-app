/* eslint-disable no-extra-semi */
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import useSearch from './components/useSearch'

const Search = () => {
	const location = useLocation()

	const [searchParams, setSearchParams] = useSearchParams()

	const [query, setQuery] = useState('')

	const updateQuery = (query) => {
		console.log(query)
		setQuery(query)
	}

	const [page, setPage] = useState(searchParams.get('page') ?? 1)

	const updatePage = (pageNumber) => {
		if (pageNumber === page) return

		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			page: pageNumber,
		})
	}

	const [options, setOptions] = useState({})

	const updateOptions = (options) => {
		setOptions(options)
	}

	let { loading, hasMore, error, results } = useSearch(query, page, options)

	useEffect(() => {
		setPage(searchParams.get('page'))
	}, [searchParams])

	return (
		<section className='search-page'>
			<h1>{location.search}</h1>
			<h2>{query}</h2>
			<h2>{page}</h2>
			<SearchBar
				updateQuery={updateQuery}
				updateOptions={updateOptions}
				updatePage={updatePage}
			/>

			<SearchResults
				animes={results}
				query={query}
				options={options}
				page={page}
				updatePage={updatePage}
			/>
		</section>
	)
}

export default Search

/* eslint-disable no-extra-semi */
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import useSearch from './components/useSearch'

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [query, setQuery] = useState('')

	const updateQuery = (_query) => {
		if (_query === query) {
			console.log('same query')
			return
		}
		console.log('update query ', _query)
		setQuery(_query)
	}

	const [page, setPage] = useState(searchParams.get('page') ?? 1)

	const updatePage = (pageNumber) => {
		console.log('change page')
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

	let { loading, pageInfo, error, results } = useSearch(query, page, options)

	useEffect(() => {
		setPage(parseInt(searchParams.get('page') ?? 1))
	}, [searchParams])

	return (
		<section className='search-page'>
			<SearchBar
				updateQuery={updateQuery}
				updateOptions={updateOptions}
				updatePage={updatePage}
			/>

			<SearchResults
				animes={results}
				query={query}
				options={options}
				currentPage={page}
				updatePage={updatePage}
				loading={loading}
				pageInfo={pageInfo}
			/>
		</section>
	)
}

export default Search

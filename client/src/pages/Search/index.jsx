import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import useSearch from './components/useSearch'

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	//* Query showed in results
	const [query, setQuery] = useState('')
	const updateQuery = (_query) => {
		if (_query === query) return
		setQuery(_query)
	}

	//* Search options
	const [options, setOptions] = useState({})
	const updateOptions = (options) => {
		setOptions(options)
	}

	//* Page used for pagination
	const [page, setPage] = useState(parseInt(searchParams.get('page') ?? 1))
	const updatePage = (pageNumber) => {
		if (pageNumber === page) return

		//* Update search params
		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			page: pageNumber,
		})
	}

	//* Sort cryteria for results
	const [sort, setSort] = useState(
		searchParams.get('sort') ?? 'POPULARITY_DESC'
	)
	const updateSort = (_sort) => {
		if (_sort === sort) return

		//* Update search params
		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			sort: _sort,
		})
	}

	//* When params are updated this effect runs
	useEffect(() => {
		setPage(parseInt(searchParams.get('page') ?? 1))
		setSort(searchParams.get('sort') ?? 'POPULARITY_DESC')
	}, [searchParams.get('page'), searchParams.get('sort')])

	// eslint-disable-next-line no-unused-vars
	let { loading, pageInfo, error, results } = useSearch(page, sort, options)

	return (
		<section className='search-page'>
			<SearchBar updateQuery={updateQuery} updateOptions={updateOptions} />

			<SearchResults
				animes={results}
				query={query}
				options={options}
				currentPage={page}
				updatePage={updatePage}
				sort={sort}
				updateSort={updateSort}
				loading={loading}
				pageInfo={pageInfo}
			/>
		</section>
	)
}

export default Search

import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'
import {
	formatOptions,
	genreOptions,
	getFormats,
	getGenres,
	getStatus,
	getYear,
	statusOptions,
	yearOptions,
} from './searchOptions'

const SearchBar = ({ updateQuery, updateOptions, updatePage }) => {
	let { state } = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()

	//* INIT
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('query') ?? state?.search ?? ''
	)

	const [selectedGenres, setSelectedGenres] = useState(
		getGenres(searchParams.get('genres'))
	)

	const [selectedYear, setSelectedYear] = useState(
		getYear(searchParams.get('year'))
	)

	const [selectedFormats, setSelectedFormats] = useState(
		getFormats(searchParams.get('formats'))
	)

	const [selectedStatus, setSelectedStatus] = useState(
		getStatus(searchParams.get('status'))
	)

	//* UPDATE
	const updateGenres = (selection) => {
		setSelectedGenres(selection)
	}

	const updateYear = (selection) => {
		setSelectedYear(selection)
	}

	const updateFormats = (selection) => {
		setSelectedFormats(selection)
	}

	const updateStatus = (selection) => {
		setSelectedStatus(selection)
	}

	//* REMOVE
	const [removeGenre, setRemoveGenre] = useState()
	const [removeYear, setRemoveYear] = useState()
	const [removeFormat, setRemoveFormat] = useState()
	const [removeStatus, setRemoveStatus] = useState()

	const search = async (e) => {
		console.log('searching')
		if (e) {
			if (typeof e !== 'string' && e.target) {
				console.log(e)
				e.preventDefault()
			}

			let params = {
				query: searchQuery,
				genres: selectedGenres.map((genre) => genre.name).join(','),
				year: selectedYear?.name ?? '',
				formats: selectedFormats.map((format) => format.name).join(','),
				status: selectedStatus?.name ?? '',
				page: searchParams.get('page') ?? '',
			}

			//* remove empty values, prevent url like query=&genres=&year=
			for (const [key, param] of Object.entries(params)) {
				if (param.length <= 0) {
					delete params[key]
				}
			}

			setSearchParams(params)
			return
		}
		console.log('formats', selectedFormats)
		let variables = {
			// search: searchQuery,
			search: searchParams.get('query') ?? '',
			genre_in: selectedGenres.map((genre) => genre.name),
			seasonYear: selectedYear?.name ?? '',
			format_in: selectedFormats.map((format) => format.name),
			status_in: selectedStatus?.name ?? '',
		}

		for (const [key, param] of Object.entries(variables)) {
			if (param.length <= 0) {
				delete variables[key]
			}
		}

		updatePage(1)
		updateOptions(variables)
		updateQuery(searchQuery)
	}

	useEffect(() => {
		console.log('params')
		console.log(searchQuery)
		getQuery()
		if (searchParams.get('query') === null) {
			return
		}
		search()
	}, [
		searchParams.get('query'),
		searchParams.get('genres'),
		searchParams.get('year'),
		searchParams.get('formats'),
		searchParams.get('status'),
	])

	// useEffect(() => {
	// 	if (
	// 		searchParams.get('query') === null ||
	// 		searchParams.get('query') === searchQuery
	// 	) {
	// 		return
	// 	}
	// 	search()
	// }, [searchParams.get('query')])

	const getQuery = () => {
		console.log('getQuery ', searchQuery)
		console.log(
			'search params',
			searchParams.get('query'),
			searchParams.get('genres'),
			searchParams.get('formats')
		)
	}

	const searchFromNavbar = (search) => {
		if (search === searchQuery) {
			console.log('uguali')
			return
		}
		let params = {
			query: search,
			genres: selectedGenres.map((genre) => genre.name).join(','),
			year: selectedYear?.name ?? '',
			formats: selectedFormats.map((format) => format.name).join(','),
			status: selectedStatus?.name ?? '',
			page: searchParams.get('page') ?? '',
		}

		for (const [key, param] of Object.entries(params)) {
			if (key === 'query') continue

			if (param.length <= 0) {
				delete params[key]
			}
		}
		setSearchParams(params)
		setSearchQuery(search)
		// setSelectedGenres([])
		// setSelectedFormats([])
		console.log(searchQuery)

		// updateQuery(search)
		// updateOptions({ search: search })
	}

	useEffect(() => {
		console.log(state)
		if (state?.search.length >= 0) {
			console.log(state.search)
			// if (state.search.length >= 0) {
			searchFromNavbar(state.search)
			// }
		}
	}, [state])

	useEffect(() => {
		console.log('ricerca')
		// if (state) {
		// 	console.log('returning with state')
		// 	return
		// }
		search(' ') //* Passing an argument to change the url
	}, [selectedGenres, selectedYear, selectedFormats, selectedStatus])

	return (
		<section
			className='search-bar'
			style={{ marginTop: '40px', marginBottom: '60px' }}
		>
			<Container>
				<Row>
					<Col>
						<div className='section-title'>
							<h2>
								Search Your Ani
								<span>me</span>
							</h2>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='search-menu'>
							<form
								className='search-bar-container'
								onSubmit={(e) => search(e)}
							>
								<input
									type='search'
									placeholder='Search...'
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value)
									}}
								/>
								<button className='search-bar-icon' type='submit'>
									<FontAwesomeIcon icon={faSearch} />
								</button>
							</form>
							<div className='search-advanced'>
								<Row>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Genres'}
											options={genreOptions}
											sendSelection={updateGenres}
											multiple
											removeSelectionObj={removeGenre}
											alreadySelected={selectedGenres}
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Year'}
											options={yearOptions}
											sendSelection={updateYear}
											removeSelectionObj={removeYear}
											alreadySelected={selectedYear}
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Format'}
											options={formatOptions}
											sendSelection={updateFormats}
											multiple
											removeSelectionObj={removeFormat}
											alreadySelected={selectedFormats}
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Status'}
											options={statusOptions}
											sendSelection={updateStatus}
											removeSelectionObj={removeStatus}
											alreadySelected={selectedStatus}
										/>
									</Col>
								</Row>
								<div className='tags-menu'>
									<FontAwesomeIcon icon={faTags} />
									<div className='tags-list'>
										{selectedGenres.map((option, idx) => {
											return (
												<div
													key={idx}
													className='tag no-hover'
													onClick={() => setRemoveGenre(option)}
												>
													<span>{option.showName}</span>
													<FontAwesomeIcon icon={faTimes} />
												</div>
											)
										})}
										{selectedYear && (
											<div
												className='tag no-hover'
												onClick={() => setRemoveYear(selectedYear)}
											>
												<span>{selectedYear.showName}</span>
												<FontAwesomeIcon icon={faTimes} />
											</div>
										)}
										{selectedFormats.map((format, idx) => {
											return (
												<div
													key={idx}
													className='tag no-hover'
													onClick={() => setRemoveFormat(format)}
												>
													<span>{format.showName}</span>
													<FontAwesomeIcon icon={faTimes} />
												</div>
											)
										})}
										{selectedStatus && (
											<div
												className='tag no-hover'
												onClick={() => setRemoveStatus(selectedStatus)}
											>
												<span>{selectedStatus.showName}</span>
												<FontAwesomeIcon icon={faTimes} />
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default SearchBar

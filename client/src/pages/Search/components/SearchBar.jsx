import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams, useLocation } from 'react-router-dom'
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
	//* It gets searchParams values only on page load
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
		if (e) {
			if (typeof e !== 'string') {
				console.log(e)
				e.preventDefault()
			}
			let params = {
				query: searchQuery,
				genres: selectedGenres.map((genre) => genre.name).join(','),
				year: selectedYear?.name ?? '',
				season: searchParams.get('season') ?? '',
				formats: selectedFormats.map((format) => format.name).join(','),
				status: selectedStatus?.name ?? '',
				sort: searchParams.get('sort') ?? 'POPULARITY_DESC',
				page: searchParams.get('page') ?? '',
			}

			//* remove empty values, prevent url like query=&genres=&year=
			for (const [key, param] of Object.entries(params)) {
				if (key === 'query') continue //* Keep query so it is not null
				if (param.length <= 0) {
					delete params[key]
				}
			}

			//* Only way to remove season from url, it changes only when a input is given in the search field
			if (searchQuery.length > 0 && 'season' in params) delete params['season']
			setSearchParams(params)
			return
		}
		let variables = {
			search: searchParams.get('query') ?? '',
			genre_in: searchParams.get('genres')?.split(',') ?? [],
			seasonYear: selectedYear?.name ?? '',
			season: searchParams.get('season') ?? '',
			format_in: selectedFormats.map((format) => format.name),
			status_in: selectedStatus?.name ?? '',
			sort: searchParams.get('sort') ?? 'POPULARITY_DESC',
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
		//* When params change, first values are all null than updated with the real value
		//* If query is null do not search
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
		searchParams.get('sort'),
	])

	const searchFromNavbar = (search) => {
		//* Do not search if value in navbar is the same as before
		if (search === searchQuery) {
			return
		}
		let params = {
			query: search,
			genres: selectedGenres.map((genre) => genre.name).join(','),
			year: selectedYear?.name ?? '',
			formats: selectedFormats.map((format) => format.name).join(','),
			status: selectedStatus?.name ?? '',
			sort: 'POPULARITY_DESC',
			page: searchParams.get('page') ?? '',
		}

		for (const [key, param] of Object.entries(params)) {
			if (key === 'query') continue //* Keep query so a blank query search can be performed

			if (param.length <= 0) {
				delete params[key]
			}
		}
		setSearchParams(params)
		setSearchQuery(search)
	}

	useEffect(() => {
		//* If state comes from navbar it has search property
		if (state?.search) {
			searchFromNavbar(state.search)
		}
	}, [state])

	useEffect(() => {
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

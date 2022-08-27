import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import SelectMenu from '../../../../components/SelectMenu'
import {
	formatOptions,
	genreOptions,
	getFormats,
	getGenres,
	getStatus,
	getYear,
	statusOptions,
	yearOptions,
} from '../searchOptions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'

//* Style
import './SearchBar.css'

const SearchBar = ({ updateQuery, updateOptions }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { state } = useLocation()

	//* INIT
	//* It gets searchParams values only on page load
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('query') ?? ''
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
				e.preventDefault()
			}
			//* Url params used when is searching using searchbar/dropdowns (manual search)
			let params = {
				query: searchQuery,
				genres: selectedGenres.map((genre) => genre.name).join(','),
				year: selectedYear?.name ?? '',
				formats: selectedFormats.map((format) => format.name).join(','),
				status: selectedStatus?.name ?? '',
				sort: searchParams.get('sort') ?? 'POPULARITY_DESC',
				page: 1,
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

		//* Options used for searching (both refreshed page and manual search)
		let options = {
			search: searchParams.get('query') ?? '',
			genre_in: searchParams.get('genres')?.split(',') ?? [],
			seasonYear: searchParams.get('year') ?? '',
			season: searchParams.get('season') ?? '',
			format_in: searchParams.get('formats')?.split(',') ?? [],
			status_in: searchParams.get('status') ?? '',
		}

		for (const [key, param] of Object.entries(options)) {
			if (param.length <= 0) {
				delete options[key]
			}
		}

		updateOptions(options)
		updateQuery(searchQuery)
	}

	useEffect(() => {
		search()
	}, [
		searchParams.get('query'),
		searchParams.get('genres'),
		searchParams.get('year'),
		searchParams.get('formats'),
		searchParams.get('status'),
	])

	//* Prevent useEffect from running at first rendering
	const firstRender = useRef(true)
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		search(' ') //* Passing an argument to change the url
	}, [selectedGenres, selectedYear, selectedFormats, selectedStatus])

	useEffect(() => {
		if (state?.search) {
			//* Update searchbar value when searching from navbar inside search page
			setSearchQuery(state.search)
			updateQuery(state.search)
			//* Reset search values
			setSelectedGenres([])
			setSelectedYear('')
			setSelectedFormats([])
			setSelectedStatus('')
		}
	}, [state])

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
										{selectedGenres.map((genre, idx) => {
											return (
												<div
													key={idx}
													className='tag no-hover'
													onClick={() => setRemoveGenre(genre)}
												>
													<span>{genre.showName}</span>
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

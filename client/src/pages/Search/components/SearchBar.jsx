/* eslint-disable no-mixed-spaces-and-tabs */
import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'

const SearchBar = ({
	// updateResults,
	// queryObj,
	updateQuery,
	updateOptions,
	updatePage,
	// page,
	// updatePage,
}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('query') ?? ''
	)

	// TODO add showName to make simple SelectMenu code
	const genreOptions = [
		{ name: 'Action', showName: 'Action' },
		{ name: 'Adventure', showName: 'Adventure' },
		{ name: 'Comedy', showName: 'Comedy' },
		{ name: 'Drama', showName: 'Drama' },
		{ name: 'Ecchi', showName: 'Ecchi' },
		{ name: 'Fantasy', showName: 'Fantasy' },
		{ name: 'Horror', showName: 'Horror' },
		{ name: 'Mahou Shoujo', showName: 'Mahou Shoujo' },
		{ name: 'Mecha', showName: 'Mecha' },
		{ name: 'Music', showName: 'Music' },
		{ name: 'Mystery', showName: 'Mystery' },
		{ name: 'Psychological', showName: 'Psychological' },
		{ name: 'Romance', showName: 'Romance' },
		{ name: 'Sci-Fi', showName: 'Sci-Fi' },
		{ name: 'Slice of Life', showName: 'Slice of Life' },
		{ name: 'Sports', showName: 'Sports' },
		{ name: 'Supernatural', showName: 'Supernatural' },
		{ name: 'Thriller', showName: 'Thriller' },
	]

	const formatOptions = [
		{ name: 'TV', showName: 'TV' },
		{ name: 'TV_SHORT', showName: 'TV Short' },
		{ name: 'MOVIE', showName: 'Movie' },
		{ name: 'SPECIAL', showName: 'Special' },
		{ name: 'OVA', showName: 'OVA' },
		{ name: 'ONA', showName: 'ONA' },
		{ name: 'MUSIC', showName: 'Music' },
	]

	const statusOptions = [
		{ name: 'RELEASING', showName: 'Airing' },
		{ name: 'NOT_YET_RELEASED', showName: 'Not Yet Aired' },
		{ name: 'FINISHED', showName: 'Finished' },
		{ name: 'CANCELLED', showName: 'Cancelled' },
	]

	const toList = (string, typeList) => {
		let list = []

		if (string) {
			string.split(',').map((item) => {
				let object = typeList.find((listItem) => listItem.name === item)
				if (object === undefined) return
				list.push(object)
			})
		}

		return list
	}

	const getYear = (string) => {
		if (!string) return

		let year = string.split(',')[0] //* if &year=2020,2021 takes firs year (2020)
		return { name: year, showName: year }
	}

	const getStatus = (string, typeList) => {
		if (!string) return

		let status
		if (string) {
			string.split(',').map((item) => {
				let object = typeList.find((listItem) => listItem.name === item)
				if (object === undefined) return
				status = object
			})
		}
		return status
	}

	const [selectedGenres, setSelectedGenres] = useState(
		toList(searchParams.get('genres'), genreOptions)
	)
	const updateGenres = (selection) => {
		setSelectedGenres(selection)
	}

	const [selectedYear, setSelectedYear] = useState(
		getYear(searchParams.get('year'))
	)
	const updateYear = (selection) => {
		setSelectedYear(selection)
	}

	const [selectedFormats, setSelectedFormats] = useState(
		toList(searchParams.get('formats'), formatOptions)
	)
	const updateFormats = (selection) => {
		setSelectedFormats(selection)
	}

	const [selectedStatus, setSelectedStatus] = useState(
		getStatus(searchParams.get('status'), statusOptions)
	)
	const updateStatus = (selection) => {
		setSelectedStatus(selection)
	}

	const [removeGenre, setRemoveGenre] = useState()
	const [removeYear, setRemoveYear] = useState()
	const [removeFormat, setRemoveFormat] = useState()
	const [removeStatus, setRemoveStatus] = useState()

	const search = async (e) => {
		if (e) {
			e.preventDefault()

			let params = {
				query: searchQuery,
				genres: selectedGenres.map((genre) => genre.name).join(','),
				year: selectedYear?.name ?? '',
				formats: selectedFormats.map((format) => format.name).join(','),
				status: selectedStatus?.name ?? '',
			}

			//* remove empty values, prevent url like query=&genres=&year=
			for (const [key, param] of Object.entries(params)) {
				if (param.length <= 0) {
					delete params[key]
				}
			}

			setSearchParams(params)
		}

		let variables = {
			search: searchQuery,
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
		search()
	}, [searchParams])

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
								{searchQuery}
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
											options={Array.from(
												{ length: (2022 - 1940) / 1 + 1 },
												(_, i) => ({
													name: (2022 - i * 1).toString(),
													showName: (2022 - i * 1).toString(),
												})
											)}
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

import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'
import { gqlAxios } from '../../../helpers/gql-axios'

const SearchBar = ({
	updateResults,
	queryObj,
	updateQuery,
	page,
	updatePage,
}) => {
	const history = useHistory()
	const location = useLocation()

	const [searchQuery, setSearchQuery] = useState('')

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

	const [selectedGenres, setSelectedGenres] = useState([])
	const updateGenres = (selection) => {
		setSelectedGenres(selection)
	}

	const [selectedYear, setSelectedYear] = useState([])
	const updateYear = (selection) => {
		console.log(selection)
		setSelectedYear(selection)
	}

	const [selectedFormats, setSelectedFormats] = useState([])
	const updateFormats = (selection) => {
		console.log(selection)
		setSelectedFormats(selection)
	}

	const [selectedStatus, setSelectedStatus] = useState([])
	const updateStatus = (selection) => {
		console.log(selection)
		setSelectedStatus(selection)
	}

	const [removeGenre, setRemoveGenre] = useState()
	const [removeYear, setRemoveYear] = useState()
	const [removeFormat, setRemoveFormat] = useState()
	const [removeStatus, setRemoveStatus] = useState()

	let query = ''
	let genres = []
	let year = ''
	let formats = []
	let status = ''

	const getVariables = () => {
		let variables = {
			page: page,
			perPage: 20,
			search: query,
			genre_in: genres.map((genre) => genre.name),
			seasonYear: year.name,
			format_in: formats.map((format) => format.name),
			status_in: status.name,
		}

		if (query.length <= 0) {
			delete variables.search
		}

		if (genres.length <= 0) {
			delete variables.genre_in
		}
		if (year?.name?.length <= 0) {
			delete variables.seasonYear
		}
		if (formats.length <= 0) {
			delete variables.format_in
		}
		if (status?.name?.length <= 0) {
			delete variables.status_in
		}

		return variables
	}

	const getUrl = () => {
		console.log(selectedYear)
		let url = `?query=`
		if (query.length > 0) {
			url = url.concat(query)
		}
		if (selectedGenres.length > 0) {
			url = url.concat(`&genres=${selectedGenres.map((genre) => genre.name)}`)
		}
		if (selectedYear?.name) {
			url = url.concat(`&year=${selectedYear.name}`)
		}
		if (selectedFormats.length > 0) {
			url = url.concat(
				`&formats=${selectedFormats.map((format) => format.name)}`
			)
		}
		if (selectedStatus?.name) {
			url = url.concat(`&status=${selectedStatus.name}`)
		}
		return url
	}

	const setParams = () => {
		const params = queryObj.search.split('&')

		params.forEach((param) => {
			let paramName = param.split('=')[0] //* genre
			let paramValue = param.split('=')[1] //* Action,Adventure

			if (paramName === '?query') {
				//* remove url characters e.g one%20piece -> one piece
				paramValue = decodeURI(paramValue)
				query = paramValue
				setSearchQuery(paramValue)
			} else if (paramName === 'genres') {
				//* if in url there is &genres= without any item skip that
				if (paramValue.length === 0) return

				const urlGenres = paramValue.split(',')
				//* helper function to get genreObj from its name
				let urlGenresObj = []
				urlGenres.forEach((genre) => {
					const obj = genreOptions.find((listGenre) => listGenre.name === genre)

					if (obj === undefined) return

					urlGenresObj.push(obj)
				})
				genres = urlGenresObj
				setSelectedGenres(urlGenresObj)
			} else if (paramName === 'year') {
				//* if in url there is &year= without any item skip that
				if (paramValue.length === 0) return

				year = { name: paramValue, showName: paramValue }
				setSelectedYear({ name: paramValue, showName: paramValue })
			} else if (paramName === 'formats') {
				//* if in url there is &formats= without any item skip that
				if (paramValue.length === 0) return

				const urlFormats = paramValue.split(',')
				//* helper function to get formatObj from its name
				let urlFormatsObj = []
				urlFormats.forEach((format) => {
					const obj = formatOptions.find(
						(listFormat) => listFormat.name === format
					)

					if (obj === undefined) return

					urlFormatsObj.push(obj)
				})

				formats = urlFormatsObj
				setSelectedFormats(urlFormatsObj)
			} else if (paramName === 'status') {
				//* if in url there is &status= without any item skip that
				if (paramValue.length === 0) return

				const obj = statusOptions.find(
					(listStatus) => listStatus.name === paramValue
				)

				if (obj === undefined) return

				status = obj
				setSelectedStatus(obj)
			}
		})
	}

	const search = async (e) => {
		//* If we are searching in search page
		//* change query value with input value (searchQuery) and stop function
		//* then useEffect[queryObj] is triggered and call again search function
		if (e) {
			e.preventDefault()
			//* update query so getUrl() can get the updated search
			query = searchQuery
			history.replace({
				pathname: location.pathname,
				search: getUrl(),
			})
			return
		}
		let StaticQuery = {
			query: ` 
				query($page: Int, $perPage: Int, $search: String, $genre_in: [String], $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus]){
					Page(page: $page, perPage: $perPage){
						media (type: ANIME, search: $search, genre_in: $genre_in, seasonYear: $seasonYear, format_in: $format_in, status_in: $status_in, sort: POPULARITY_DESC){
							id
							title{
								english
								romaji
							}
							episodes
							nextAiringEpisode{
								episode
							}
							popularity
							coverImage{
								large
							}
							genres
						}
					}
				}
					
			`,
			variables: getVariables(),
		}

		//* Send query string to SearchResults component
		updateQuery(query)

		const result = await gqlAxios({ data: StaticQuery })
		if (result?.data?.data.Page) {
			updateResults(result.data.data.Page.media)
		}
	}
	useEffect(() => {
		setParams()
		search()
	}, [queryObj])

	//* Use this to update page
	// useEffect(() => {
	// 	search()
	// }, [page])

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
								{page}
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
											alreadySelected={
												Array.isArray(selectedYear) ? [] : [selectedYear]
											}
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
											alreadySelected={
												Array.isArray(selectedStatus) ? [] : [selectedStatus]
											}
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
										{!Array.isArray(selectedYear) && (
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
										{!Array.isArray(selectedStatus) && (
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

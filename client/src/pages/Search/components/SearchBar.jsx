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

	// TODO add Season search

	const genreOptions = [
		{ id: 1, name: 'Action' },
		{ id: 2, name: 'Adventure' },
		{ id: 3, name: 'Comedy' },
		{ id: 4, name: 'Drama' },
		{ id: 5, name: 'Ecchi' },
		{ id: 6, name: 'Fantasy' },
		{ id: 7, name: 'Horror' },
		{ id: 8, name: 'Mahou Shoujo' },
		{ id: 9, name: 'Mecha' },
		{ id: 10, name: 'Music' },
		{ id: 11, name: 'Mystery' },
		{ id: 12, name: 'Psychological' },
		{ id: 13, name: 'Romance' },
		{ id: 14, name: 'Sci-Fi' },
		{ id: 15, name: 'Slice of Life' },
		{ id: 16, name: 'Sports' },
		{ id: 17, name: 'Supernatural' },
		{ id: 18, name: 'Thriller' },
	]

	const formatOptions = [
		{ id: 1, name: 'TV', showName: 'TV' },
		{ id: 2, name: 'TV_SHORT', showName: 'TV Short' },
		{ id: 3, name: 'MOVIE', showName: 'Movie' },
		{ id: 4, name: 'SPECIAL', showName: 'Special' },
		{ id: 5, name: 'OVA', showName: 'OVA' },
		{ id: 6, name: 'ONA', showName: 'ONA' },
		{ id: 7, name: 'MUSIC', showName: 'Music' },
	]

	let query = ''

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

	const [removeGenre, setRemoveGenre] = useState()
	const [removeYear, setRemoveYear] = useState()
	const [removeFormat, setRemoveFormat] = useState()

	let genres = []
	let year = []

	const getVariables = () => {
		let variables = {
			page: page,
			perPage: 20,
			search: query,
			genre_in: genres.map((genre) => genre.name),
			seasonYear: year.map((year) => year.name).toString(),
		}

		if (query.length <= 0) {
			delete variables.search
		}

		if (genres.length <= 0) {
			delete variables.genre_in
		}

		if (year.length <= 0) {
			delete variables.seasonYear
		}
		return variables
	}

	const getUrl = () => {
		let url = `?query=`
		if (query.length > 0) {
			url = url.concat(query)
		}
		if (selectedGenres.length > 0) {
			url = url.concat(`&genres=${selectedGenres.map((genre) => genre.name)}`)
		}
		if (selectedYear.length > 0) {
			url = url.concat(`&year=${selectedYear[0].name}`)
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
				// TODO helper function to get genreObj from its name
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
				year = [{ name: paramValue }]
				setSelectedYear([{ name: paramValue }])
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
				query($page: Int, $perPage: Int, $search: String, $genre_in: [String], $seasonYear: Int){
					Page(page: $page, perPage: $perPage){
						media (type: ANIME, search: $search, genre_in: $genre_in, seasonYear: $seasonYear, sort: POPULARITY_DESC){
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
		//* Send query string to SearchResults
		if (query.length > 0) updateQuery(query)

		const result = await gqlAxios({ data: StaticQuery })
		if (result?.data?.data.Page) {
			updateResults(result.data.data.Page.media)
		}
	}
	useEffect(() => {
		setParams()
		search()
	}, [queryObj])

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
										{/* <SelectMenu
                                    menuTitle={'Season'}
                                    sendSelection={sendSelection}
                                    multiple
                                    removeSelectionObj={removeSelectionObj}
                                /> */}
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
													<span>{option.name}</span>
													<FontAwesomeIcon icon={faTimes} />
												</div>
											)
										})}
										{selectedYear.map((_year, idx) => {
											return (
												<div
													key={idx}
													className='tag no-hover'
													onClick={() => setRemoveYear(_year)}
												>
													<span>{_year.name}</span>
													<FontAwesomeIcon icon={faTimes} />
												</div>
											)
										})}
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

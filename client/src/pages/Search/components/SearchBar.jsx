import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'
import { gqlAxios } from '../../../helpers/gql-axios'

const SearchBar = ({ updateResults, query, page, updatePage }) => {
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

	// let StaticQuery = { query: '', variables: {} }

	const [selectedGenres, setSelectedGenres] = useState([])
	const updateGenres = (selection) => {
		setSelectedGenres(selection)
		// if (selection.length > 0) {
		// 	console.log('ma ci sei qui?')
		// 	StaticQuery.variables = {
		// 		...StaticQuery.variables,
		// 		genre_in: selection.map((genre) => genre.name),
		// 	}
		// } else {
		// 	delete StaticQuery.variables.genre_in
		// }
		// console.log(StaticQuery)
	}

	const [year, setYear] = useState([])
	const updateYear = (selection) => {
		console.log(selection)
		setYear(selection)
	}

	const [selectedFormats, setSelectedFormats] = useState([])
	const updateFormats = (selection) => {
		console.log(selection)
		setSelectedFormats(selection)
	}

	const [removeGenre, setRemoveGenre] = useState()
	const [removeYear, setRemoveYear] = useState()
	const [removeFormat, setRemoveFormat] = useState()
	// ${
	// selectedGenres.length > 0 ? 'genre_in: $genre_in,' : ''
	// }
	// ${

	// 	query.length > 0 ? 'search: $search,' : ''
	// }

	const getVariables = () => {
		let variables = {
			page: page,
			perPage: 20,
			search: query,
			genre_in: selectedGenres.map((genre) => genre.name),
		}

		if (query.length <= 0) {
			delete variables.search
		}
		if (selectedGenres.length <= 0) {
			delete variables.genre_in
		}
		return variables
	}

	const search = async (e) => {
		//* If we are searching in search page
		//* change query value with input value (searchQuery) and stop function
		//* then useEffect[query] is triggered and call again search function
		if (e) {
			console.log('stai qua')
			e.preventDefault()
			query = searchQuery
			history.replace({
				pathname: location.pathname,
				search: `?query=${searchQuery}`,
			})
			// TODO add &genre= to url in order to make it change when query is the same but genre is removed
			//* query=one%20piece&genre=ecchi == no results
			//* query=one%20piece == doesn't update because query is the same
			if (searchQuery.length <= 0) search()
			return
		}
		let StaticQuery = {
			query: ` 
				query($page: Int, $perPage: Int, $search: String, $genre_in: [String]){
					Page(page: $page, perPage: $perPage){
						media (type: ANIME, search: $search, genre_in: $genre_in, sort: POPULARITY_DESC){
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
			// {
			// 	...StaticQuery.variables,
			// 	page: page,
			// 	perPage: 20,
			// 	// genre_in: ['Action'],
			// 	// genre_in: selectedGenres.map((genre) => genre.name),
			// },
		}
		console.log(StaticQuery)
		const result = await gqlAxios({ data: StaticQuery })
		if (result?.data?.data.Page) {
			updateResults(result.data.data.Page.media)
		}
	}
	useEffect(() => {
		setSearchQuery(query)
		console.log('refresh?')
		// if (query.length > 0) {
		// 	console.log(StaticQuery.variables)
		// 	StaticQuery.variables = { ...StaticQuery.variables, search: query }
		// 	console.log(StaticQuery.variables)
		// 	console.log('modifico')
		// } else {
		// 	delete StaticQuery.variables.search
		// }
		// updatePage(1)
		search()
	}, [query])

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
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Year'}
											options={Array.from(
												{ length: (2022 - 1940) / 1 + 1 },
												(_, i) => ({
													id: i,
													name: (2022 - i * 1).toString(),
												})
											)}
											sendSelection={updateYear}
											removeSelectionObj={removeYear}
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										<SelectMenu
											menuTitle={'Format'}
											options={formatOptions}
											sendSelection={updateFormats}
											multiple
											removeSelectionObj={removeFormat}
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
										{year.map((_year, idx) => {
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

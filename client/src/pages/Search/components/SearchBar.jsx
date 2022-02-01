import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'
import { gqlAxios } from '../../../helpers/gql-axios'

const SearchBar = ({ updateResults, query }) => {
	const history = useHistory()
	const location = useLocation()

	const [searchQuery, setSearchQuery] = useState('')

	// TODO
	// const option = {
	// 	type: 'genre',
	// 	id: '1',
	// 	name: 'Shounen'
	// }

	// TODO differentiate for genres, year, type ecc...
	const [selectedOptions, setSelectedOptions] = useState([
		{ title: 'Shounen' },
		{ title: 'Ecchi' },
		{ title: 'Hentai' },
		{ title: 'Comedy' },
		{ title: 'Thriller' },
		{ title: 'Friends' },
		{ title: 'Psycological' },
		{ title: 'Psycological' },
		{ title: 'Psycological' },
	])
	const sendSelection = (selection) => {
		console.log(selection)
		setSelectedOptions(selection)
	}

	const [removeSelectionObj, setRemoveSelectionObj] = useState()

	const search = async (e) => {
		//* If we are searching in search page
		//* change query value with input value (searchQuery) and stop function
		//* then useEffect[query] is triggered and call again search function
		if (e) {
			e.preventDefault()
			query = searchQuery
			history.replace({
				pathname: location.pathname,
				search: `?query=${searchQuery}`,
			})
			return
		}
		const StaticQuery = {
			query: ` 
				query($page: Int, $perPage: Int, $search: String){
					Page(page: $page, perPage: $perPage){
						media (type: ANIME, search: $search, sort: POPULARITY_DESC){
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
			variables: { page: 1, perPage: 20, search: query },
		}
		const result = await gqlAxios({ data: StaticQuery })
		if (result?.data?.data.Page) {
			updateResults(result.data.data.Page.media)
		}
	}
	useEffect(() => {
		setSearchQuery(query)
		search()
	}, [query])

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
										{/* TODO create custom select menu */}
										<SelectMenu
											menuTitle={'Genres'}
											sendSelection={sendSelection}
											multiple
											removeSelectionObj={removeSelectionObj}
										/>
									</Col>
									<Col lg={3} md={3} sm={12}>
										{/* <SelectMenu
                                    menuTitle={'Year'}
                                    sendSelection={sendSelection}
                                    removeSelectionObj={removeSelectionObj}
                                /> */}
									</Col>
									<Col lg={3} md={3} sm={12}>
										{/* <SelectMenu
                                    menuTitle={'Type'}
                                    sendSelection={sendSelection}
                                    multiple
                                    removeSelectionObj={removeSelectionObj}
                                /> */}
									</Col>
									<Col lg={3} md={3} sm={12}>
										{/* <SelectMenu
                                    menuTitle={'State'}
                                    sendSelection={sendSelection}
                                    multiple
                                    removeSelectionObj={removeSelectionObj}
                                /> */}
									</Col>
								</Row>
								<div className='tags-menu'>
									<FontAwesomeIcon icon={faTags} />
									<div className='tags-list'>
										{selectedOptions.map((option, idx) => {
											return (
												<div
													key={idx}
													className='tag no-hover'
													onClick={() => setRemoveSelectionObj(option)}
												>
													<span>{option.title}</span>
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

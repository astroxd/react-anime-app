import { faSearch, faTags, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import SelectMenu from '../../../components/SelectMenu'
// import { jikanAxios } from '../../../helpers/jikan-axios'

// eslint-disable-next-line no-unused-vars
const SearchBar = ({ updateResults, searchQuery }) => {
	const history = useHistory()
	const location = useLocation()
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
		if (e) {
			e.preventDefault()
			history.replace({
				pathname: location.pathname,
				search: e.target[0].value,
			})
		}
		// const result = await jikanAxios.get('/top/anime/1/bypopularity')
		// if (result?.data?.top) {
		// 	let results = result.data.top.slice(0, 20)
		// 	updateResults(results)
		// }
	}

	useEffect(() => {
		if (searchQuery) {
			search()
		}
		return () => {}
	}, [searchQuery])

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
									defaultValue={searchQuery ? searchQuery : ''}
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

import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Axios from 'axios'
import AnimeCard from '../components/AnimeCard'
import tagMap from '../helpers/tag-map'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch,
	faTags,
	faTimes,
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { jikanAxios } from '../helpers/jikan-axios'
import cover1 from '../assets/images/cover1.jpg'
import cover2 from '../assets/images/cover2.jpg'
import cover3 from '../assets/images/cover3.jpg'
import SelectMenu from '../components/SelectMenu'
const SearchResults = () => {
	// const location = useLocation()

	// const [Tags, setTags] = useState([])

	// const [SearchedAnime, setSearchedAnime] = useState([])

	// const searchAnime = async (Query, Tags) => {
	// 	let finalQuery = ''
	// 	let isTopAnime = false
	// 	if (Tags.length === 0) {
	// 		if (Query.length < 3) {
	// 			finalQuery = 'https://api.jikan.moe/v3/top/anime/1/bypopularity'
	// 			isTopAnime = true
	// 		} else {
	// 			finalQuery = `https://api.jikan.moe/v3/search/anime?q=${Query}&oder_by=title&sort=desc&page=1`
	// 		}
	// 	} else {
	// 		if (Query.length < 3) {
	// 			finalQuery = `https://api.jikan.moe/v3/search/anime?q=&genre=${Tags}&order_by=members&sort=desc&page=1`
	// 		} else {
	// 			finalQuery = `https://api.jikan.moe/v3/search/anime?q=${Query}&genre=${Tags}&order_by=members&sort=desc&page=1`
	// 		}
	// 	}
	// 	const result = await Axios.get(finalQuery, {
	// 		//TODO progress bar
	// 	})
	// 	if (result && result.data) {
	// 		console.log('finished')
	// 		if (isTopAnime) {
	// 			setSearchedAnime(result.data.top)
	// 		} else {
	// 			setSearchedAnime(result.data.results)
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	setTags(location.state.tags)
	// 	searchAnime(location.state.query, location.state.tags)
	// }, [location])

	// TODO
	// const option = {
	// 	type: 'genre',
	// 	id: '1',
	// 	name: 'Shounen'
	// }

	const [animes, setAnimes] = useState([])
	const getTopAnimes = async () => {
		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result && result.data && result.data.top) {
			setAnimes(result.data.top.slice(0, 9))
		}
	}

	// TODO differentiate for genres, year, type ecc...
	const [selectedOptions, setSelectedOptions] = useState([
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
		{ title: 'cacca' },
	])
	const sendSelection = (selection) => {
		console.log(selection)
		setSelectedOptions(selection)
	}

	const covers = [cover1, cover2, cover3]

	const [removeSelectionObj, setRemoveSelectionObj] = useState()

	useEffect(() => {
		getTopAnimes()
	}, [])
	return (
		<section className='search-page'>
			<section
				className='search'
				style={{ marginTop: '40px', marginBottom: '60px' }}
			>
				<Container>
					<Row>
						<Col>
							<div className='section-title'>
								<h2>
									Search Your Ani
									<span style={{ color: 'red' }}>me</span>
								</h2>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='search-menu'>
								<div className='search-bar'>
									<input type='search' placeholder='Search...' />
									<span className='search-bar-icon'>
										<FontAwesomeIcon icon={faSearch} />
									</span>
								</div>
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
			<section
				className='search-result'
				style={{ marginTop: '40px', marginBottom: '60px' }}
			>
				<Container>
					<Row>
						<Col>
							<div className='section-header'>
								<div className='section-title'>
									<h4>Results</h4>
								</div>
								<div className='order-by'>
									<span>Order by:</span>
									<select name='' id=''>
										<option value=''>A-Z</option>
									</select>
								</div>
								<span className='search-query'>Search for Naruto</span>
								<div className='inline-pagination'>
									<Link to='/' className='pagination-indicator first current'>
										<span>1</span>
									</Link>
									<Link to='/' className='pagination-indicator'>
										<span>2</span>
									</Link>{' '}
									<Link to='/' className='pagination-indicator'>
										<span>...</span>
									</Link>{' '}
									<Link to='/' className='pagination-indicator'>
										<span>3</span>
									</Link>{' '}
									<Link to='/' className='pagination-indicator'>
										<span>4</span>
									</Link>
								</div>
							</div>
						</Col>
					</Row>
					<Row style={{ marginTop: '20px' }}>
						{animes.map((anime, idx) => (
							<Col xl={3} lg={4} md={6} sm={6} key={idx}>
								<div className='anime-card'>
									<div className='anime-card-image'>
										<Link
											to={`/anime/${anime.mal_id}`}
											href={anime.url}
											target='_blank'
											rel='noreferrer'
										>
											<img
												src={covers[Math.floor(Math.random() * covers.length)]}
												alt={`${anime.title} image`}
											/>
										</Link>
										<div className='anime-card-image-overlay episodes'>{`${anime.episodes} / ${anime.episodes}`}</div>
										<div className='anime-card-image-overlay view'>
											<FontAwesomeIcon icon={faEye} />
											{anime.members}
										</div>
									</div>
									<div className='anime-card-text'>
										{/* <ul>
											{genres.map((genre, idx) => (
												<li key={idx}>
													<Link to='/'>{genre.name}</Link>
												</li>
											))}
										</ul> */}
										<h5>
											<Link
												to={`/anime/${anime.mal_id}`}
												href={anime.url}
												target='_blank'
												rel='noreferrer'
											>
												{anime.title}
											</Link>
										</h5>
									</div>
								</div>
							</Col>
						))}
					</Row>
					<Row style={{ marginTop: '20px' }}>
						<Col>
							<div className='pagination'>
								<Link to='/' className='pagination-indicator '>
									<FontAwesomeIcon icon={faAngleDoubleLeft} />
								</Link>
								<Link to='/' className='pagination-indicator current'>
									<span>1</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>2</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>...</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>3</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>4</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<FontAwesomeIcon icon={faAngleDoubleRight} />
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</section>
	)
}

export default SearchResults

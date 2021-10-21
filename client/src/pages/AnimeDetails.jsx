import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authAxios } from '../helpers/auth-axios'
import { jikanAxios } from '../helpers/jikan-axios'
import { Container, Row, Col } from 'react-bootstrap'

const AnimeDetails = () => {
	let { id } = useParams()

	const [Details, setDetails] = useState({
		url: '',
		episodes: 0,
		members: 0,
		popularity: 0,
		rank: 0,
		score: 0,
		status: '',
		title: '',
		title_english: '',
		genres: [],
		image_url: '',
		rating: '',
	})

	// // eslint-disable-next-line no-unused-vars
	const [Related, setRelated] = useState({})

	// const [Episodes, setEpisodes] = useState([])

	// const [isInWatchList, setIsInWatchList] = useState(false)

	const GetAnimeDetails = async () => {
		const result = await jikanAxios.get(`/anime/${id}`)
		if (result && result.data) {
			setDetails(result.data)
		}
		// setRelated(result.data.related)
	}

	// const GetAnimeEpisodes = async () => {
	// 	const result = await jikanAxios.get(`/anime/${id}/episodes`)
	// 	setEpisodes(result.data.episodes)
	// }

	// const GetList = async () => {
	// 	const result = await Axios.get(
	// 		`http://localhost:3001/api/watchlist/list/${id}`
	// 	)
	// 	setIsInWatchList(result.data.message)
	// }

	// const [isFavorite, setIsFavorite] = useState(false)

	// const GetFavorite = async () => {
	// 	const result = await authAxios.get(`/favorite/list/${id}`)
	// 	if (result && result.data) {
	// 		setIsFavorite(result.data.message)
	// 	}
	// }

	useEffect(() => {
		GetAnimeDetails()
		// GetAnimeEpisodes()
		// GetList()
		// GetFavorite()
	}, [])

	// const saveToWatchlist = () => {
	// 	Axios.post('http://localhost:3001/api/watchlist/insert', { id }).then(
	// 		(result) => console.log(result)
	// 	)
	// 	setIsInWatchList(true)
	// }

	// const removeFromWatchlist = () => {
	// 	Axios.delete(`http://localhost:3001/api/watchlist/delete/${id}`, {
	// 		id,
	// 	}).then((result) => console.log(result))
	// 	setIsInWatchList(false)
	// }

	// const saveToFavorite = () => {
	// 	authAxios
	// 		.post('/favorite/insert', { id })
	// 		.then((result) => {
	// 			console.log(result)
	// 			setIsFavorite(true)
	// 		})
	// 		.catch((error) => console.log(error))
	// }

	// const removeFromFavorite = () => {
	// 	authAxios
	// 		.delete(`/favorite/delete/${id}`)
	// 		.then((result) => {
	// 			console.log(result)
	// 			setIsFavorite(false)
	// 		})
	// 		.catch((error) => console.log(error))
	// }

	return (
		<section style={{ paddingBottom: '100px', paddingTop: '60px' }}>
			<Container>
				<div className='anime-details-content'>
					<Row>
						<Col lg={3}>
							{/* TODO: using a img inside div make div wider than image */}
							<div
								className='anime-details-img'
								style={{ backgroundImage: `url(${Details.image_url})` }}
							>
								<div className='comments'>
									<i className='fas fa-comments'></i>
									{' 1000'}
								</div>
								<div className='view'>
									<i className='fas fa-eye'></i>
									{' 1000'}
								</div>
							</div>
						</Col>
						<Col lg={9}>
							<div className='anime-details-description'>
								<Row>
									<Col lg={9} md={9}>
										<div className='anime-details-title'>
											<h3>One Piece </h3>
											<span>Alt title </span>
										</div>
									</Col>
									<Col lg={3} md={3}>
										<div className='anime-details-rating'>
											<div className='rating'>
												<i className='fas fa-star'></i>
												<i className='fas fa-star'></i>
												<i className='fas fa-star'></i>
												<i className='fas fa-star'></i>
												<i className='fas fa-star'></i>
											</div>
											<span>1.2000 Votes</span>
										</div>
									</Col>
								</Row>
								<p>Desc</p>
								<div className='anime-details-info'>
									<Row>
										<Col lg={6} md={6}>
											<ul>
												<li>
													<span>Type:</span>
													<p>
														Lorem ipsum dolor sit amet consectetur adipisicing
													</p>
												</li>
												<li>
													<span>Studios:</span>
													<p>Studios</p>
												</li>
												<li>
													<span>Date Aired:</span>
													<p>Oct 02, 2019 to ?</p>
												</li>
												<li>
													<span>Status:</span>
													<p>Airing</p>
												</li>
												<li>
													<span>Genre:</span>
													<p>
														Action, Comedy, Adventure, Fantasy, Harem, Ecchi
													</p>
												</li>
											</ul>
										</Col>
										<Col lg={6} md={6}>
											<ul>
												<li>
													<span>Scores:</span>
													<p>7.31/1,515</p>
												</li>
												<li>
													<span>Rating:</span>
													<p>Rating</p>
												</li>
												<li>
													<span>Duration:</span>
													<p>24 min/ep</p>
												</li>
												<li>
													<span>Quality:</span>
													<p>HD</p>
												</li>
												<li>
													<span>Views:</span>
													<p>131,541</p>
												</li>
											</ul>
										</Col>
									</Row>
								</div>
								<div className='anime-details-buttons'>
									<button className='primary-btn'>
										<i className='far fa-heart'></i>
										{' Follow'}
									</button>
									<Link to='/'>
										<span>Watch Now</span>
										<i className='fas fa-angle-right'></i>
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				<Row>
					<Col lg={8}>
						<div className='anime-details-tags'>
							<div className='section-title'>
								<h5>Tags</h5>
							</div>
							<div className='tags'>
								<div className='tag'>Skeleton</div>
								<div className='tag'>Piracy</div>
								<div className='tag'>Piracy</div>
								<div className='tag'>Piracy</div>
								<div className='tag'>Piracy</div>
								<div className='tag'>Piracy</div>
							</div>
						</div>
						<div className='anime-details-character'>
							<Row>
								<Col lg={8} md={8} sm={8}>
									<div className='section-title'>
										<h5>Characters</h5>
									</div>
								</Col>
								<Col lg={4} md={4} sm={4}>
									<div className='button-all'>
										<Link to='/'>
											View All
											<i className='fas fa-long-arrow-alt-right'></i>
										</Link>
									</div>
								</Col>
							</Row>
							<div className='characters'>
								<div className='character-card'></div>
								<div className='character-card'></div>
								<div className='character-card'></div>
							</div>
						</div>
					</Col>
					<Col lg={4}>
						<div className='anime-details-sidebar'>
							<div className='section-title'>
								<h5>You Might Like...</h5>
							</div>
							<div
								className='side-anime-card anime-card-image'
								style={{
									backgroundImage: `url(https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f)`,
								}}
							>
								<div className='episodes'>{`10 / 10`}</div>
								<div className='view'>
									<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
									9000
								</div>
								<h5>
									<Link to='/'>
										{"NOME DELL'ANIME SUPER FIGO ASSURDO PAZZO FURIOSO"}
									</Link>
								</h5>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)

	// return (
	// 	<div>
	// 		<div className='banner'>
	// 			{isInWatchList ? (
	// 				<button onClick={removeFromWatchlist}>REMOVE FROM WATCHLIST</button>
	// 			) : (
	// 				<button onClick={saveToWatchlist}>ADD TO WATCHLIST</button>
	// 			)}
	// 			{isFavorite ? (
	// 				<button onClick={removeFromFavorite}>REMOVE FROM FAVORITE</button>
	// 			) : (
	// 				<button onClick={saveToFavorite}>ADD TO FAVORITE</button>
	// 			)}
	// 		</div>
	// 		<div className='anime-details'>
	// 			<aside
	// 				style={{
	// 					maxWidth: '257px',
	// 					display: 'flex',
	// 					flexDirection: 'column',
	// 					alignItems: 'center',
	// 					background: 'orange',
	// 				}}
	// 			>
	// 				<img
	// 					src={Details.image_url}
	// 					alt={Details.title}
	// 					style={{ padding: '1rem', background: 'yellow' }}
	// 				/>

	// 				<div
	// 					style={{
	// 						wordBreak: 'break-all',
	// 					}}
	// 				>
	// 					<h1 style={{}}>{Details.title} ddddddddddddddddddddd</h1>
	// 				</div>
	// 			</aside>

	// 			<main>
	// 				<div
	// 					className='score'
	// 					style={{
	// 						display: 'flex',
	// 						flexDirection: 'column',
	// 						background: 'red',
	// 						padding: '0 1rem',
	// 						flexWrap: 'wrap',
	// 					}}
	// 				>
	// 					<h4>Rank {Details.popularity}</h4>
	// 					<h4>Popularity {Details.rank}</h4>
	// 					<h4>Score {Details.score}</h4>
	// 					<h4>Members {Details.members}</h4>
	// 					<h4>Status {Details.status}</h4>
	// 					<a href={Details.url}>{Details.url}</a>
	// 				</div>
	// 				<div
	// 					className='tags'
	// 					style={{
	// 						background: 'blue',
	// 						padding: '1rem ',
	// 						margin: '1rem 0',
	// 						display: 'flex',
	// 						flexWrap: 'wrap',
	// 					}}
	// 				>
	// 					{Details.genres.map((genre) => (
	// 						<h4
	// 							key={genre.mal_id}
	// 							style={{
	// 								background: '#faa',
	// 								margin: '8px',
	// 								padding: '8px',
	// 								borderRadius: '0.4em',
	// 							}}
	// 						>
	// 							{genre.name}
	// 						</h4>
	// 					))}
	// 				</div>
	// 				<div className='related'>
	// 					{/* {Related.Sequel.map((animeObj) => (
	// 						<h1>{animeObj.name}</h1>
	// 					))}
	//                      */}
	// 					{/* <h1>{Details.related.Sequel[0].name}</h1> */}
	// 				</div>
	// 				<div className='episodes'>
	// 					{Episodes.map((episode, idx) => (
	// 						<h1 key={idx}>{episode.title}</h1>
	// 					))}
	// 				</div>
	// 			</main>
	// 		</div>
	// 	</div>
	// )
}

export default AnimeDetails

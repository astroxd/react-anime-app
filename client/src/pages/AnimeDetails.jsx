import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authAxios } from '../helpers/auth-axios'
import { jikanAxios } from '../helpers/jikan-axios'

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

	// eslint-disable-next-line no-unused-vars
	const [Related, setRelated] = useState({})

	const [Episodes, setEpisodes] = useState([])

	const [isInWatchList, setIsInWatchList] = useState(false)

	const GetAnimeDetails = async () => {
		const result = await jikanAxios.get(`/anime/${id}`)
		setDetails(result.data)
		setRelated(result.data.related)
	}

	const GetAnimeEpisodes = async () => {
		const result = await jikanAxios.get(`/anime/${id}/episodes`)
		setEpisodes(result.data.episodes)
	}

	const GetList = async () => {
		const result = await Axios.get(
			`http://localhost:3001/api/watchlist/list/${id}`
		)
		setIsInWatchList(result.data.message)
	}

	const [isFavorite, setIsFavorite] = useState(false)

	const GetFavorite = async () => {
		const result = await authAxios.get(`/favorite/list/${id}`)
		if (result && result.data) {
			setIsFavorite(result.data.message)
		}
	}

	useEffect(() => {
		GetAnimeDetails()
		GetAnimeEpisodes()
		GetList()
		GetFavorite()
	}, [])

	const saveToWatchlist = () => {
		Axios.post('http://localhost:3001/api/watchlist/insert', { id }).then(
			(result) => console.log(result)
		)
		setIsInWatchList(true)
	}

	const removeFromWatchlist = () => {
		Axios.delete(`http://localhost:3001/api/watchlist/delete/${id}`, {
			id,
		}).then((result) => console.log(result))
		setIsInWatchList(false)
	}

	const saveToFavorite = () => {
		authAxios
			.post('/favorite/insert', { id })
			.then((result) => {
				console.log(result)
				setIsFavorite(true)
			})
			.catch((error) => console.log(error))
	}

	const removeFromFavorite = () => {
		authAxios
			.delete(`/favorite/delete/${id}`)
			.then((result) => {
				console.log(result)
				setIsFavorite(false)
			})
			.catch((error) => console.log(error))
	}

	return (
		<div>
			<div className='banner'>
				{isInWatchList ? (
					<button onClick={removeFromWatchlist}>REMOVE FROM WATCHLIST</button>
				) : (
					<button onClick={saveToWatchlist}>ADD TO WATCHLIST</button>
				)}
				{isFavorite ? (
					<button onClick={removeFromFavorite}>REMOVE FROM FAVORITE</button>
				) : (
					<button onClick={saveToFavorite}>ADD TO FAVORITE</button>
				)}
			</div>
			<div className='anime-details'>
				<aside
					style={{
						maxWidth: '257px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						background: 'orange',
					}}
				>
					<img
						src={Details.image_url}
						alt={Details.title}
						style={{ padding: '1rem', background: 'yellow' }}
					/>

					<div
						style={{
							wordBreak: 'break-all',
						}}
					>
						<h1 style={{}}>{Details.title} ddddddddddddddddddddd</h1>
					</div>
				</aside>

				<main>
					<div
						className='score'
						style={{
							display: 'flex',
							flexDirection: 'column',
							background: 'red',
							padding: '0 1rem',
							flexWrap: 'wrap',
						}}
					>
						<h4>Rank {Details.popularity}</h4>
						<h4>Popularity {Details.rank}</h4>
						<h4>Score {Details.score}</h4>
						<h4>Members {Details.members}</h4>
						<h4>Status {Details.status}</h4>
						<a href={Details.url}>{Details.url}</a>
					</div>
					<div
						className='tags'
						style={{
							background: 'blue',
							padding: '1rem ',
							margin: '1rem 0',
							display: 'flex',
							flexWrap: 'wrap',
						}}
					>
						{Details.genres.map((genre) => (
							<h4
								key={genre.mal_id}
								style={{
									background: '#faa',
									margin: '8px',
									padding: '8px',
									borderRadius: '0.4em',
								}}
							>
								{genre.name}
							</h4>
						))}
					</div>
					<div className='related'>
						{/* {Related.Sequel.map((animeObj) => (
							<h1>{animeObj.name}</h1>
						))}
                         */}
						{/* <h1>{Details.related.Sequel[0].name}</h1> */}
					</div>
					<div className='episodes'>
						{Episodes.map((episode, idx) => (
							<h1 key={idx}>{episode.title}</h1>
						))}
					</div>
				</main>
			</div>
		</div>
	)
}

export default AnimeDetails

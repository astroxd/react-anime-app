import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AnimeDetails = () => {
	let { id } = useParams()

	const [Details, setDetails] = useState({
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

	const [Related, setRelated] = useState({})

	const [Episodes, setEpisodes] = useState([])

	const [isInWatchList, setIsInWatchList] = useState(false)

	const GetAnimeDetails = async () => {
		const result = await Axios.get(`https://api.jikan.moe/v3/anime/${id}`)
		setDetails(result.data)
		setRelated(result.data.related)
	}

	const GetAnimeEpisodes = async () => {
		const result = await Axios.get(
			`https://api.jikan.moe/v3/anime/${id}/episodes`
		)
		setEpisodes(result.data.episodes)
	}

	const GetList = async () => {
		const result = await Axios.get(
			`http://localhost:3001/api/watchlist/list/${id}`
		)
		setIsInWatchList(result.data.message)
	}

	useEffect(() => {
		GetAnimeDetails()
		GetAnimeEpisodes()
		GetList()
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

	return (
		<div>
			<div className='banner'>
				{isInWatchList ? (
					<button onClick={removeFromWatchlist}>REMOVE FROM WATCHLIST</button>
				) : (
					<button onClick={saveToWatchlist}>ADD TO WATCHLIST</button>
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
						{Episodes.map((episode) => (
							<h1>{episode.title}</h1>
						))}
					</div>
				</main>
			</div>
		</div>
	)
}

export default AnimeDetails

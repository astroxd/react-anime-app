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
	})

	const [Related, setRelated] = useState({})

	const GetAnimeDetails = async () => {
		const result = await Axios.get(`https://api.jikan.moe/v3/anime/${id}`)
		setDetails(result.data)
		setRelated(result.data.related)
	}

	useEffect(() => {
		GetAnimeDetails()
	}, [])

	return (
		<div>
			<div className='banner'></div>
			<div className='anime-details'>
				<aside>
					<div style={{ padding: '1rem', background: 'yellow' }}>
						<img src={Details.image_url} alt={Details.title} />
					</div>
					<div style={{}}>
						<h1 style={{ paddingLeft: '1rem' }}>{Details.title}</h1>
					</div>
				</aside>

				<main>
					<div
						className='score'
						style={{
							display: 'flex',
							background: 'red',
							padding: '0 1rem',
							flexWrap: 'wrap',
						}}
					>
						<h4>Rank {Details.popularity}</h4>
						<h4>Popularity {Details.rank}</h4>
						<h4>Score {Details.score}</h4>
						<h4>Members {Details.members}</h4>
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
				</main>
			</div>
		</div>
	)
}

export default AnimeDetails

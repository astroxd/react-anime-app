import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { jikanAxios } from '../../helpers/jikan-axios'
import { authAxios } from '../../helpers/auth-axios'
import WatchlistCard from './components/WatchlistCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const WatchList = () => {
	const [Anime, setAnime] = useState([])
	const [resetMenu, setResetMenu] = useState(false)

	document.onclick = (e) => {
		//* if clicked element has .more-options as parent return the clicked obj
		//* otherwise null
		let closest = e.target.closest('.more-options')

		if (closest === null) {
			setResetMenu(!resetMenu)
		}
	}

	const GetWatchList = async () => {
		// const result = await authAxios.get('/watchlist/list')

		// //! If it consume much resources watch this
		// //! https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/

		// const asyncRes = await Promise.all(
		// 	result.data.map(async (anime) => {
		// 		const result = await jikanAxios.get(`/anime/${anime.id}`)
		// 		return {
		// 			id: result.data.mal_id,
		// 			title: result.data.title,
		// 			cover: result.data.image_url,
		// 			synopsis: result.data.synopsis,
		// 			status: result.data.status,
		// 		}
		// 	})
		// )

		// setAnime(asyncRes)

		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result && result.data && result.data.top) {
			setAnime(result.data.top.slice(0, 9))
		}
	}

	const removeFromWatchList = (e, id) => {
		e.preventDefault()
		authAxios
			.delete(`/watchlist/delete/${id}`)
			.then(() => setAnime(Anime.filter((anime) => anime.id !== id)))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		GetWatchList()
	}, [])
	return (
		<section className='watchlist'>
			<Container style={{ marginTop: '40px', marginBottom: '50px' }}>
				<Row>
					<div className='section-header'>
						<div className='section-title'>
							<h4>Watching</h4>
						</div>
						{/* TODO maybe remove View All button and lazy load all animes while scrolling down */}
						<div className='section-button-all'>
							<Link to='/'>
								View All
								<FontAwesomeIcon icon={faLongArrowAltRight} />
								{/* <i className='fas fa-long-arrow-alt-right'></i> */}
							</Link>
						</div>
					</div>
				</Row>

				<Row>
					{Anime.map((anime, idx) => (
						<WatchlistCard
							anime={anime}
							idx={idx}
							reset={resetMenu}
							key={idx}
						/>
					))}
				</Row>
			</Container>
		</section>
	)
}

export default WatchList

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { jikanAxios } from '../../helpers/jikan-axios'
import Characters from './components/Characters'
import AnimeDescription from './components/Description'
import Related from './components/Related'
import Tags from './components/Tags'

const AnimeDetails = () => {
	// let { id } = useParams()

	// const [Details, setDetails] = useState({
	// 	url: '',
	// 	episodes: 0,
	// 	members: 0,
	// 	popularity: 0,
	// 	rank: 0,
	// 	score: 0,
	// 	status: '',
	// 	title: '',
	// 	title_english: '',
	// 	genres: [],
	// 	image_url: '',
	// 	rating: '',
	// })

	// // eslint-disable-next-line no-unused-vars
	// const [Related, setRelated] = useState({})

	// const [Episodes, setEpisodes] = useState([])

	// const [isInWatchList, setIsInWatchList] = useState(false)

	// const GetAnimeDetails = async () => {
	// 	const result = await jikanAxios.get(`/anime/${id}`)
	// 	if (result && result.data) {
	// 		setDetails(result.data)
	// 	}
	// 	// setRelated(result.data.related)
	// }

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

	// useEffect(() => {
	// GetAnimeDetails()
	// GetAnimeEpisodes()
	// GetList()
	// GetFavorite()
	// }, [])

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
				<AnimeDescription />
				<Row>
					<Col lg={8}>
						<Tags />
						<Characters />
					</Col>
					<Col lg={4}>
						<Related />
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default AnimeDetails

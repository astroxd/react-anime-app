/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router'
import { gqlAxios, jikanAxios } from '../../helpers/gql-axios'
import Characters from './components/Characters'
import AnimeDescription from './components/Description'
import Recommendations from './components/Recommendations'
import Tags from './components/Tags'

const AnimeDetails = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [isCharactersPage, setCharactersPage] = useState(false)
	// const [isCharactersPage, setCharactersPage] = useState(
	// 	pathname.endsWith('characters') ? true : false
	// )

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

	const [animeDetails, setAnimeDetails] = useState()
	const [animeTags, setAnimeTags] = useState()
	const [animeCharacters, setAnimeCharacters] = useState()
	const [animeRecommendations, setAnimeRecommendations] = useState()

	const getAnimeDetails = async () => {
		const query = {
			query: ` 
			query($id: Int){
				Media(id: $id){
					title{
						english
						romaji
						native
					}
					description(asHtml: false)
					format
					studios{
						nodes{
							name
						}
					}
					startDate{
						year
						month
						day
					}
					endDate{
						year
						month
						day
					}
					status
					genres
					averageScore
					popularity
					duration
					coverImage{
						extraLarge
					}
					favourites
				}
			}
				
		`,
			variables: { id },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media) {
			setAnimeDetails(result?.data?.data?.Media)
		}
	}

	const getAnimeTags = async () => {
		const query = {
			query: ` 
			query($id: Int){
				Media(id: $id){
					tags{
						id
						name
					}
				}
			}
				
		`,
			variables: { id },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media) {
			setAnimeTags(result?.data?.data?.Media)
		}
	}

	const getAnimeCharacters = async () => {
		const query = {
			query: ` 
			query($id: Int){
				Media(id: $id){
					characters(sort: [FAVOURITES_DESC, RELEVANCE]) {
						edges{
							node {
							  name {
								first
								middle
								last
							  }
							  image{
								large
								medium
							  }
							}
							role
							voiceActors(language:JAPANESE) {
							  name {
								full
							  }
							  image{
								large
								medium
							  }
							  languageV2
							}
							
						}
					}
				}
			}
				
		`,
			variables: { id },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media?.characters?.edges) {
			setAnimeCharacters(result?.data?.data?.Media?.characters?.edges)
			console.log(animeCharacters)
		}
	}

	const getAnimeRecommendations = async () => {
		const query = {
			query: ` 
			query($id: Int){
				Media(id: $id){
					recommendations(sort: RATING_DESC, perPage: 5) {
						edges {
						  	node {
								mediaRecommendation {
							  		id
									title {
										english
										romaji
							 		}
									coverImage {
										extraLarge
									}
									bannerImage
									episodes
									popularity
									nextAiringEpisode{
										episode
									}
									status
								}
						  	}
						}
					}
				}
			}	
		`,
			variables: { id },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media?.recommendations?.edges) {
			setAnimeRecommendations(result?.data?.data?.Media?.recommendations?.edges)
		}
	}

	useEffect(() => {
		// TODO create hooks for api calls
		console.log(pathname)
		getAnimeDetails()
		getAnimeCharacters()

		if (pathname.endsWith('characters')) {
			setCharactersPage(true)
		} else {
			setCharactersPage(false)
			getAnimeTags()
			getAnimeRecommendations()
		}
	}, [pathname])

	return (
		<section className='anime-details'>
			<Container>
				{animeDetails && <AnimeDescription object={animeDetails} />}

				<Row>
					{isCharactersPage ? (
						<Col>{animeCharacters && <Characters id={id} />}</Col>
					) : (
						<>
							<Col lg={8}>
								{animeTags && <Tags tags={animeTags} />}

								{animeCharacters && <Characters id={id} />}
							</Col>
							<Col lg={4}>
								{animeRecommendations && (
									<Recommendations recommendations={animeRecommendations} />
								)}
							</Col>
						</>
					)}
				</Row>
			</Container>
		</section>
	)
}

export default AnimeDetails

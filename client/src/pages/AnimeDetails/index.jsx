import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router'
import { gqlAxios } from '../../helpers/gql-axios'
import Characters from './components/Characters'
import AnimeDescription from './components/Description'
import Recommendations from './components/Recommendations'
import Tags from './components/Tags'

const AnimeDetails = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [isCharactersPage, setCharactersPage] = useState(false)

	const [animeDetails, setAnimeDetails] = useState()
	const [animeTags, setAnimeTags] = useState()
	const [animeRecommendations, setAnimeRecommendations] = useState()

	const getAnimeDetails = async () => {
		const query = {
			query: `
			query($id: Int){
				Media(id: $id){
					id
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
						large
					}
					favourites
					episodes
				}
			}

		`,
			variables: { id },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media) {
			setAnimeDetails(result?.data?.data?.Media)
			console.log(result.data.data.Media)
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
		getAnimeDetails()

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
				{animeDetails && <AnimeDescription {...animeDetails} />}

				<Row>
					{isCharactersPage ? (
						<Col>
							<Characters id={id} />
						</Col>
					) : (
						<>
							<Col lg={8}>
								{animeTags && <Tags tags={animeTags} />}

								<Characters id={id} />
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

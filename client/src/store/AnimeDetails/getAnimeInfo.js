import { gqlAxios } from '../../helpers/gql-axios'
import useAnimeDetailsStore from './useAnimeDetailsStore'

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
                nextAiringEpisode{
                    airingAt 
                }
            }
        }

    `,
		variables: { id: useAnimeDetailsStore.getState().id },
	}

	const result = await gqlAxios({ data: query })
	if (result?.data?.data?.Media) {
		useAnimeDetailsStore.setState({ details: result?.data?.data?.Media })
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
		variables: { id: useAnimeDetailsStore.getState().id },
	}

	const result = await gqlAxios({ data: query })
	if (result?.data?.data?.Media) {
		useAnimeDetailsStore.setState({ tags: result?.data?.data?.Media })
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
		variables: { id: useAnimeDetailsStore.getState().id },
	}

	const result = await gqlAxios({ data: query })
	if (result?.data?.data?.Media?.recommendations?.edges) {
		useAnimeDetailsStore.setState({
			recommendations: result?.data?.data?.Media?.recommendations?.edges,
		})
	}
}

export { getAnimeDetails, getAnimeTags, getAnimeRecommendations }

import { useState, useEffect } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'
import SideSection from './SideSection'

const AllTimePopular = () => {
	const [animes, setAnimes] = useState([])

	const query = {
		query: `
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (type: ANIME, sort: POPULARITY_DESC){
						id
						title{
                            english
							romaji
						}
						episodes
						nextAiringEpisode{
							episode
						}
						popularity
						bannerImage
						coverImage{
							extraLarge
						}
                        status
					}
				}
			}

		`,
		variables: {
			page: 1,
			perPage: 5,
		},
	}

	const getAnimes = async () => {
		const result = await gqlAxios({ data: query })
		if (result?.data?.data.Page) {
			setAnimes(result.data.data.Page.media)
		}
	}

	useEffect(() => {
		getAnimes()
	}, [])

	return (
		<SideSection
			sectionName={'All Time Popular'}
			animes={animes}
			link='/search'
		/>
	)
}

export default AllTimePopular

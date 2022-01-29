import axios from 'axios'
import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'
import SectionTemplate from './SectionTemplate'

const TrendingNow = () => {
	const [animes, setAnimes] = useState([])

	const query = {
		query: ` 
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (sort: TRENDING_DESC){
						id
						title{
							english
						}
						episodes
						nextAiringEpisode{
							episode
						}
						popularity
						coverImage{
							large
						}
						genres
					}
				}
			}
				
		`,
		variables: { page: 1, perPage: 9 },
	}

	const getTopAnimes = async () => {
		const result = await gqlAxios({ data: query })
		if (result?.data?.data.Page) {
			console.log(result.data.data.Page.media)
			setAnimes(result.data.data.Page.media)
		}
	}

	useEffect(() => {
		getTopAnimes()
	}, [])

	return <SectionTemplate sectionName='Trending Now' animes={animes} />
}

export default TrendingNow

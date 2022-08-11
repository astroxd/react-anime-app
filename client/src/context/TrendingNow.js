import { createContext, useEffect, useState } from 'react'
import { gqlAxios } from '../helpers/gql-axios'

const TrendingNowContext = createContext({})

export const TrendingNowProvider = ({ children }) => {
	const [trendingNow, setTrendingNow] = useState()
	const [loading, setLoading] = useState(true)

	const query = {
		query: `
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (type: ANIME, sort: TRENDING_DESC){
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
						coverImage{
							large
						}
						genres
						status
					}
				}
			}

		`,
		variables: { page: 1, perPage: 9 },
	}

	const getAnimes = async () => {
		setLoading(true)
		try {
			const response = await gqlAxios({ data: query })
			if (response.data?.data.Page) {
				console.log('trending now')
				setTrendingNow(response.data.data.Page.media)
			}
			setLoading(false)
		} catch (error) {
			console.log('error in context:', error)
		}
	}

	useEffect(() => {
		getAnimes()
	}, [])

	return (
		<TrendingNowContext.Provider
			value={{ trendingNow, setTrendingNow, loading }}
		>
			{children}
		</TrendingNowContext.Provider>
	)
}

export default TrendingNowContext

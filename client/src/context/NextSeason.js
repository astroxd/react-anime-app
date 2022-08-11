import { createContext, useEffect, useState } from 'react'
import { gqlAxios } from '../helpers/gql-axios'

const NextSeasonContext = createContext([])

export const NextSeasonProvider = ({ children }) => {
	const [nextSeason, setNextSeason] = useState()
	const [loading, setLoading] = useState(true)

	const getSeason = () => {
		const month = new Date().getMonth()
		if (month === 11 || month === 0 || month === 1) {
			return 'SPRING'
		} else if (month === 2 || month === 3 || month === 4) {
			return 'SUMMER'
		} else if (month === 5 || month === 6 || month === 7) {
			return 'FALL'
		} else {
			return 'WINTER'
		}
	}

	const query = {
		query: `
			query($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason){
				Page(page: $page, perPage: $perPage){
					media (seasonYear: $seasonYear, season: $season, type: ANIME, sort: POPULARITY_DESC){
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
			seasonYear: new Date().getFullYear(),
			season: getSeason(),
		},
	}

	const getAnimes = async () => {
		setLoading(true)
		try {
			const response = await gqlAxios({ data: query })
			if (response.data?.data.Page) {
				console.log('next season')
				setNextSeason(response.data.data.Page.media)
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
		<NextSeasonContext.Provider value={{ nextSeason, setNextSeason, loading }}>
			{children}
		</NextSeasonContext.Provider>
	)
}

export default NextSeasonContext

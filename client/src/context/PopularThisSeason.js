import { createContext, useEffect, useState } from 'react'
import { gqlAxios } from '../helpers/gql-axios'

const PopularThisSeasonContext = createContext({})

export const PopularThisSeasonProvider = ({ children }) => {
	const [popularThisSeason, setPopularThisSeason] = useState()
	const [loading, setLoading] = useState(true)

	const getSeason = () => {
		const month = new Date().getMonth()
		// TODO give treshold for season change
		if (month === 11 || month === 0 || month === 1) {
			return 'WINTER'
		} else if (month === 2 || month === 3 || month === 4) {
			return 'SPRING'
		} else if (month === 5 || month === 6 || month === 7) {
			return 'SUMMER'
		} else {
			return 'FALL'
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
							large
						}
						genres
						status
					}
				}
			}

		`,
		variables: {
			page: 1,
			perPage: 9,
			seasonYear: new Date().getFullYear(),
			season: getSeason(),
		},
	}

	const getAnimes = async () => {
		setLoading(true)
		try {
			const response = await gqlAxios({ data: query })
			if (response.data?.data.Page) {
				console.log('popular this season')
				setPopularThisSeason(response.data.data.Page.media)
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
		<PopularThisSeasonContext.Provider
			value={{ popularThisSeason, setPopularThisSeason, loading }}
		>
			{children}
		</PopularThisSeasonContext.Provider>
	)
}

export default PopularThisSeasonContext

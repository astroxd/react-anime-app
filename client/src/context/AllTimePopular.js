import { createContext, useEffect, useState } from 'react'
import { gqlAxios } from '../helpers/gql-axios'

const AllTimePopularContext = createContext([])

export const AllTimePopularProvider = ({ children }) => {
	const [allTimePopular, setAllTimePopular] = useState()
	const [loading, setLoading] = useState(true)

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
		setLoading(true)
		try {
			const response = await gqlAxios({ data: query })
			if (response.data?.data.Page) {
				console.log('all time popular')
				setAllTimePopular(response.data.data.Page.media)
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
		<AllTimePopularContext.Provider
			value={{ allTimePopular, setAllTimePopular, loading }}
		>
			{children}
		</AllTimePopularContext.Provider>
	)
}

export default AllTimePopularContext

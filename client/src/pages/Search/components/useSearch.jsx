import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'

export default function useSearch(page, sort, options) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [results, setResults] = useState([])
	const [pageInfo, setPageInfo] = useState({})

	useEffect(() => {
		getResults()
	}, [page, sort, options])

	const getResults = async () => {
		setLoading(true)
		setError(false)
		const query = {
			query: `
			query($page: Int, $perPage: Int, $search: String, $genre_in: [String], $seasonYear: Int, $season: MediaSeason, $format_in: [MediaFormat], $status_in: [MediaStatus], $sort: [MediaSort]){
		        Page(page: $page, perPage: $perPage){
					pageInfo{
						total
						perPage
						lastPage
						hasNextPage
					}
		            media (type: ANIME, search: $search, genre_in: $genre_in, seasonYear: $seasonYear, season: $season, format_in: $format_in, status_in: $status_in, sort: $sort){
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
			variables: { page, perPage: 12, sort, ...options },
		}
		console.log(query)
		const result = await gqlAxios({ data: query })

		if (result?.data?.data.Page) {
			setResults(result.data.data.Page.media)
			setPageInfo(result.data.data.Page.pageInfo)
			setLoading(false)
		} else {
			setError(true)
		}
	}

	return { loading, pageInfo, error, results }
}

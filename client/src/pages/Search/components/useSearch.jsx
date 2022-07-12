import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'

export default function useSearch(search, page, options) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [results, setResults] = useState([])
	const [pageInfo, setPageInfo] = useState({})

	useEffect(() => {
		setResults([])
	}, [])

	useEffect(() => {
		getResults()
	}, [page, options])

	const getResults = async () => {
		setLoading(true)
		setError(false)
		const query = {
			query: `
			query($page: Int, $perPage: Int, $search: String, $genre_in: [String], $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus]){
		        Page(page: $page, perPage: $perPage){
					pageInfo{
						total
						perPage
						lastPage
						hasNextPage
					}
		            media (type: ANIME, search: $search, genre_in: $genre_in, seasonYear: $seasonYear, format_in: $format_in, status_in: $status_in, sort: POPULARITY_DESC){
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
		            }
		        }
		    }

		`,
			variables: { page, perPage: 10, ...options },
		}
		console.log(query)
		const result = await gqlAxios({ data: query })

		if (result?.data?.data.Page) {
			setResults([...result.data.data.Page.media])
			setPageInfo(result.data.data.Page.pageInfo)
			setLoading(false)
		} else {
			setError(true)
		}
	}

	return { loading, pageInfo, error, results }
}

import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'

export default function useSearch(search, page) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [results, setResults] = useState([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setResults([])
	}, [])

	useEffect(() => {
		// setResults([])
		console.log(search, page)
		getResults()
	}, [search])

	useEffect(() => {
		console.log(search, page)
		getResults()
	}, [page])

	const getResults = async () => {
		setLoading(true)
		setError(false)
		const query = {
			query: `
			query($page: Int, $perPage: Int, $search: String, $genre_in: [String], $seasonYear: Int, $format_in: [MediaFormat], $status_in: [MediaStatus]){
		        Page(page: $page, perPage: $perPage){
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
			variables: { search, page, perPage: 10 },
		}

		const result = await gqlAxios({ data: query })

		if (result?.data?.data.Page) {
			setResults([...result.data.data.Page.media])
			// setHasMore(result?.data?.data?.Media?.characters?.pageInfo?.hasNextPage)
			setLoading(false)
		} else {
			setError(true)
		}
	}

	return { loading, hasMore, error, results }
}

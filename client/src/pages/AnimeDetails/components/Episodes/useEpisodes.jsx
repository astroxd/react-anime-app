import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../../helpers/gql-axios'

export default function useEpisodes(id, pageNumber) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [episodes, setEpisodes] = useState([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setEpisodes([])
	}, [])

	const getAnimeEpisodes = async () => {
		setLoading(true)
		setError(false)
		const query = {
			query: `
			query($id: Int, $pageNumber: Int){
				Media(id: $id){
					streamingEpisodes{
                        title
                        thumbnail
                        url
                    }
				}
			}

		`,
			variables: { id, pageNumber },
		}

		console.log(query)
		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media?.streamingEpisodes) {
			setEpisodes([...episodes, ...result.data.data.Media.streamingEpisodes])
			setHasMore(result.data.data.Media.streamingEpisodes.pageInfo?.hasNextPage)
			setLoading(false)
		} else {
			setError(true)
		}
	}

	useEffect(() => {
		getAnimeEpisodes()
	}, [pageNumber])

	return { loading, hasMore, error, episodes }
}

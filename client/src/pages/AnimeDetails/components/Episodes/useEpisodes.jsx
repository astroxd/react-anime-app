import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useEpisodes(idMal, pageNumber) {
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
		const result = await axios.get(
			`https://api.jikan.moe/v4/anime/${idMal}/videos/episodes?page=${pageNumber}`
		)
		if (result?.data) {
			console.log(result.data)
			setEpisodes([...episodes, ...result.data.data])
			setHasMore(result.data.pagination.has_next_page)
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

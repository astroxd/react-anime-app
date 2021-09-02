import { useEffect, useState } from 'react'
import { jikanAxios } from '../../../helpers/jikan-axios'
import SectionTemplate from './SectionTemplate'

const TrendingNow = () => {
	const [animes, setAnimes] = useState([])

	let topAnimes = [] //* pass this to view all instead of making another request

	const getTopAnimes = async () => {
		topAnimes = []
		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result && result.data && result.data.top) {
			topAnimes = result.data.top
			setAnimes(result.data.top.slice(0, 9))
		}
	}

	useEffect(() => {
		getTopAnimes()
	}, [])

	return <SectionTemplate sectionName='Top Anime' animes={animes} />
}

export default TrendingNow

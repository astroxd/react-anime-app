import { useContext } from 'react'
import { useEffect, useState } from 'react'
import TrendingNowContext from '../../../context/TrendingNow'
import SectionTemplate from './SectionTemplate'

const TrendingNow = () => {
	const [animes, setAnimes] = useState([])

	const { trendingNow, loading } = useContext(TrendingNowContext)

	useEffect(() => {
		if (!loading) {
			setAnimes(trendingNow)
		}
	}, [loading])

	return (
		<SectionTemplate
			sectionName='Trending Now'
			animes={animes}
			link='/search?sort=TRENDING_DESC'
		/>
	)
}

export default TrendingNow

import { useTrendingNowAnimes } from '../../../store/HomePage/useHomePageAnimes'
import SectionTemplate from './SectionTemplate'
const TrendingNow = () => {
	const { animes, loading } = useTrendingNowAnimes()

	return (
		// !loading && (
		<SectionTemplate
			sectionName='Trending Now'
			animes={animes}
			link='/search?sort=TRENDING_DESC'
		/>
		// )
	)
}

export default TrendingNow

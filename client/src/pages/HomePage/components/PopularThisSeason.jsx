import { usePopularThisSeasonAnimes } from '../../../store/HomePage/useHomePageAnimes'
import { getCurrentSeason } from '../../../helpers/animeSeasons'
import SectionTemplate from './SectionTemplate'

const PopularThisSeason = () => {
	const { animes, loading } = usePopularThisSeasonAnimes()
	return (
		// !loading && (
		<SectionTemplate
			sectionName='Popular This Season'
			animes={animes}
			link={`/search?year=${new Date().getFullYear()}&season=${getCurrentSeason()}&sort=POPULARITY_DESC`}
		/>
		// )
	)
}

export default PopularThisSeason

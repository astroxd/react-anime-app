import { useNextSeasonAnimes } from '../../../store/HomePage/useHomePageAnimes'
import { getNextSeason } from '../../../helpers/animeSeasons'
import SideSection from './SideSection'

const NextSeason = () => {
	const { animes, loading } = useNextSeasonAnimes()

	return (
		// !loading && (
		<SideSection
			sectionName={'Next Season'}
			animes={animes}
			link={`/search?year=${new Date().getFullYear()}&season=${getNextSeason()}&sort=POPULARITY_DESC`}
		/>
		// )
	)
}

export default NextSeason

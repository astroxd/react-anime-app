import { useAllTimePopularAnimes } from '../../../store/HomePage/useHomePageAnimes'
import SideSection from './SideSection'

const AllTimePopular = () => {
	const { animes, loading } = useAllTimePopularAnimes()
	return (
		!loading && (
			<SideSection
				sectionName={'All Time Popular'}
				animes={animes}
				link='/search'
			/>
		)
	)
}

export default AllTimePopular

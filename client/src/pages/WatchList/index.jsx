import SectionWithSearch from '../../components/SectionWithSearch'
import CompletedList from './components/CompletedList'
import WatchingList from './components/WatchingList'
import PlanningList from './components/PlanningList'
const WatchList = () => {
	return (
		<section className='watchlist'>
			<SectionWithSearch sectionTitle={'Completed'} Animes={CompletedList} />
			<SectionWithSearch sectionTitle={'Watching'} Animes={WatchingList} />
			<SectionWithSearch sectionTitle={'Planning'} Animes={PlanningList} />
		</section>
	)
}

export default WatchList

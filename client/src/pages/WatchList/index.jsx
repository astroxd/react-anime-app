import SectionWithSearch from '../../components/SectionWithSearch'
import CompletedList from './components/CompletedList'
import WatchingList from './components/WatchingList'
import PlanningList from './components/PlanningList'
const WatchList = () => {
	return (
		<section className='watchlist'>
			<SectionWithSearch sectionTitle={'Completed'} Component={CompletedList} />
			<SectionWithSearch sectionTitle={'Watching'} Component={WatchingList} />
			<SectionWithSearch sectionTitle={'Planning'} Component={PlanningList} />
		</section>
	)
}

export default WatchList

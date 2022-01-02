import CompletedList from './components/CompletedList'
import WatchingList from './components/WatchingList'
import PlanningList from './components/PlanningList'
const WatchList = () => {
	return (
		<section className='watchlist'>
			<WatchingList />
			<PlanningList />
			<CompletedList />
		</section>
	)
}

export default WatchList

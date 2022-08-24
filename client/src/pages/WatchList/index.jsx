import List from './components/List'

import { useUserLists } from '../../store/UserLists/useUserLists'
import PageLoader from '../../components/PageLoader'

const WatchList = () => {
	const { lists, loading } = useUserLists()

	return loading ? (
		<PageLoader />
	) : (
		<section className='watchlist'>
			{lists.map((list, idx) => (
				<List {...list} key={idx} />
			))}
		</section>
	)
}

export default WatchList

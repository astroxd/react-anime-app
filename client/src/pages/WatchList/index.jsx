import List from './components/List'

import { useUserLists } from '../../store/UserLists/useUserLists'
import Loader from '../../components/Loader'

const WatchList = () => {
	const { lists, loading } = useUserLists()

	return loading ? (
		<section
			style={{ height: '90vmin', display: 'flex', alignItems: 'center' }}
		>
			<Loader />
		</section>
	) : (
		<section className='watchlist'>
			{lists.map((list, idx) => (
				<List {...list} key={idx} />
			))}
		</section>
	)
}

export default WatchList

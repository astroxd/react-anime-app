import List from './components/List'

import { useUserLists } from '../../store/UserLists/useUserLists'

const WatchList = () => {
	const { lists } = useUserLists()

	return (
		<section className='watchlist'>
			{lists.map((list, idx) => (
				<List {...list} key={idx} />
			))}
		</section>
	)
}

export default WatchList

import List from './components/List'

import { useUserLists } from '../../store/UserLists/useUserLists'
import { useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthProvider'
import Loader from '../../components/Loader'

const WatchList = () => {
	const { loading, auth } = useContext(AuthContext)

	const { lists, hasData, loading: listLoading, getUserLists } = useUserLists()

	useEffect(() => {
		if (!hasData && !loading) {
			getUserLists(auth)
		}
	}, [loading, hasData])

	return listLoading ? (
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

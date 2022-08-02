import { authAxios } from './../../helpers/auth-axios'
import { useContext, useEffect, useState } from 'react'
import AuthContext from './../../context/AuthProvider'
import List from './components/List'
const WatchList = () => {
	const { auth, loading } = useContext(AuthContext)

	const [lists, setLists] = useState([])

	const getUserLists = async () => {
		const response = await authAxios.get(`/lists/${auth.id}`)
		console.log(response.data)
		if (response.data) setLists(response.data.slice(0, 1))
	}

	useEffect(() => {
		if (!loading) {
			getUserLists()
		}
	}, [loading])

	return (
		<section className='watchlist'>
			{lists.map((list, idx) => (
				<List {...list} key={idx} />
			))}
		</section>
	)
}

export default WatchList

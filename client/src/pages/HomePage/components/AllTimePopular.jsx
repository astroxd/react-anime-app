import { useContext } from 'react'
import { useState, useEffect } from 'react'
import AllTimePopularContext from '../../../context/AllTimePopular'
import SideSection from './SideSection'

const AllTimePopular = () => {
	const [animes, setAnimes] = useState([])

	const { allTimePopular, loading } = useContext(AllTimePopularContext)

	useEffect(() => {
		if (!loading) setAnimes(allTimePopular)
	}, [loading])

	return (
		<SideSection
			sectionName={'All Time Popular'}
			animes={animes}
			link='/search'
		/>
	)
}

export default AllTimePopular

import { useContext } from 'react'
import { useEffect, useState } from 'react'
import NextSeasonContext from '../../../context/NextSeason'
import SideSection from './SideSection'

const NextSeason = () => {
	const [animes, setAnimes] = useState([])

	const { nextSeason, loading } = useContext(NextSeasonContext)

	// TODO make it better
	const getSeason = () => {
		const month = new Date().getMonth()
		if (month === 11 || month === 0 || month === 1) {
			return 'SPRING'
		} else if (month === 2 || month === 3 || month === 4) {
			return 'SUMMER'
		} else if (month === 5 || month === 6 || month === 7) {
			return 'FALL'
		} else {
			return 'WINTER'
		}
	}

	useEffect(() => {
		if (!loading) {
			setAnimes(nextSeason)
		}
	}, [loading])

	return (
		<SideSection
			sectionName={'Next Season'}
			animes={animes}
			link={`/search?year=${new Date().getFullYear()}&season=${getSeason()}&sort=POPULARITY_DESC`}
		/>
	)
}

export default NextSeason

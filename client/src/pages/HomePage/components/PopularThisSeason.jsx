import { useContext } from 'react'
import { useState, useEffect } from 'react'
import PopularThisSeasonContext from '../../../context/PopularThisSeason'
import SectionTemplate from './SectionTemplate'

const PopularThisSeason = () => {
	const [animes, setAnimes] = useState([])

	const { popularThisSeason, loading } = useContext(PopularThisSeasonContext)

	// TODO make it better
	const getSeason = () => {
		const month = new Date().getMonth()
		// TODO give treshold for season change
		if (month === 11 || month === 0 || month === 1) {
			return 'WINTER'
		} else if (month === 2 || month === 3 || month === 4) {
			return 'SPRING'
		} else if (month === 5 || month === 6 || month === 7) {
			return 'SUMMER'
		} else {
			return 'FALL'
		}
	}

	useEffect(() => {
		if (!loading) {
			setAnimes(popularThisSeason)
		}
	}, [loading])

	return (
		<SectionTemplate
			sectionName='Popular This Season'
			animes={animes}
			link={`/search?year=${new Date().getFullYear()}&season=${getSeason()}&sort=POPULARITY_DESC`}
		/>
	)
}

export default PopularThisSeason

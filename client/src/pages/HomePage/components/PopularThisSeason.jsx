import { useState, useEffect } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'
import SectionTemplate from './SectionTemplate'

const PopularThisSeason = () => {
	const [animes, setAnimes] = useState([])

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

	const query = {
		query: ` 
			query($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason){
				Page(page: $page, perPage: $perPage){
					media (seasonYear: $seasonYear, season: $season, type: ANIME, sort: POPULARITY_DESC){
						id
						title{
							english
						}
						episodes
						nextAiringEpisode{
							episode
						}
						popularity
						coverImage{
							large
						}
						genres
					}
				}
			}
				
		`,
		variables: {
			page: 1,
			perPage: 9,
			seasonYear: new Date().getFullYear(),
			season: getSeason(),
		},
	}

	const getAnimes = async () => {
		const result = await gqlAxios({ data: query })
		if (result?.data?.data.Page) {
			console.log(result.data.data.Page.media)
			setAnimes(result.data.data.Page.media)
		}
	}

	useEffect(() => {
		getAnimes()
	}, [])

	return <SectionTemplate sectionName='Popular This Season' animes={animes} />
}

export default PopularThisSeason

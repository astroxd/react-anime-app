import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jikanAxios } from '../../../helpers/jikan-axios'
import SectionTemplate from './SectionTemplate'

const TrendingNow = () => {
	// const slides = [
	// 	{
	// 		title: 'Death Note',
	// 		cover:
	// 			'https://cdn.myanimelist.net/images/anime/9/9453.jpg?s=b89e80691ac5cc0610847ccbe0b8424a',
	// 		url: 'https://myanimelist.net/anime/1535/Death_Note',
	// 		rank: 1,
	// 	},
	// 	{
	// 		title: 'Shingeki no Kyojin',
	// 		cover:
	// 			'https://cdn.myanimelist.net/images/anime/10/47347.jpg?s=29949c6e892df123f0b0563e836d3d98',
	// 		url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin',
	// 		rank: 2,
	// 	},
	// 	{
	// 		title: 'Fullmetal Alchemist: Brotherhood',
	// 		cover:
	// 			'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
	// 		url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
	// 		rank: 3,
	// 	},
	// ]

	const [animes, setAnimes] = useState([])

	let topAnimes = [] //* pass this to view all instead of making another request

	const getTopAnimes = async () => {
		topAnimes = []
		const result = await jikanAxios.get('/top/anime/1/bypopularity')
		if (result && result.data && result.data.top) {
			topAnimes = result.data.top
			setAnimes(result.data.top.slice(0, 9))
		}
	}

	useEffect(() => {
		getTopAnimes()
	}, [])

	return <SectionTemplate sectionName='Top Anime' animes={animes} />
}

export default TrendingNow

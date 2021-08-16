import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Axios from 'axios'
import AnimeCard from '../components/AnimeCard'
import tagMap from '../helpers/tag-map'
const SearchResults = () => {
	const location = useLocation()

	const [Tags, setTags] = useState([])

	const [SearchedAnime, setSearchedAnime] = useState([])

	const searchAnime = async (Query, Tags) => {
		let finalQuery = ''
		let isTopAnime = false
		if (Tags.length === 0) {
			if (Query.length < 3) {
				finalQuery = 'https://api.jikan.moe/v3/top/anime/1/bypopularity'
				isTopAnime = true
			} else {
				finalQuery = `https://api.jikan.moe/v3/search/anime?q=${Query}&oder_by=title&sort=desc&page=1`
			}
		} else {
			if (Query.length < 3) {
				finalQuery = `https://api.jikan.moe/v3/search/anime?q=&genre=${Tags}&order_by=members&sort=desc&page=1`
			} else {
				finalQuery = `https://api.jikan.moe/v3/search/anime?q=${Query}&genre=${Tags}&order_by=members&sort=desc&page=1`
			}
		}
		const result = await Axios.get(finalQuery)
		if (result && result.data) {
			console.log('finished')
			if (isTopAnime) {
				setSearchedAnime(result.data.top)
			} else {
				setSearchedAnime(result.data.results)
			}
		}
	}

	useEffect(() => {
		setTags(location.state.tags)
		searchAnime(location.state.query, location.state.tags)
	}, [location])

	return (
		<div className='search-results'>
			<div className='tag-list'>
				{Tags.map((tag, idx) => (
					<Link
						className='tag'
						key={idx}
						to={{
							pathname: '/search',
							search: `?query=&tags=${tag}`,
							state: { query: '', tags: [tag] },
						}}
					>
						{tagMap.get(tag)}
					</Link>
				))}
			</div>
			<div className='anime-list'>
				{SearchedAnime.map((anime, idx) => (
					<AnimeCard key={idx} {...anime} />
				))}
			</div>
		</div>
	)
}

export default SearchResults

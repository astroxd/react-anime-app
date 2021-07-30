import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Axios from 'axios'
import AnimeCard from '../components/AnimeCard'
import tagMap from '../helpers/tag-map'
const SearchResults = () => {
	const location = useLocation()

	const history = useHistory()

	const [Query, setQuery] = useState('')
	const [Tags, setTags] = useState([])

	const [SearchedAnime, setSearchedAnime] = useState([])

	const [FinalQuery, setFinalQuery] = useState('')

	const searchAnime = async () => {
		if (Tags.length === 0) {
			if (Query.length < 3) {
				console.log('TOP ANIME')
			} else {
				setFinalQuery(
					`https://api.jikan.moe/v3/search/anime?q=${Query}&oder_by=title&sort=desc&page=1`
				)
			}
		} else {
			if (Query.length < 3) {
				setFinalQuery(
					`https://api.jikan.moe/v3/search/anime?q=&genre=${Tags.join(
						','
					)}&order_by=members&sort=desc&page=1`
				)
			} else {
				setFinalQuery(
					`https://api.jikan.moe/v3/search/anime?q=${Query}&genre=${Tags.join(
						','
					)}&order_by=members&sort=desc&page=1`
				)
			}
		}
		console.log(FinalQuery)
		const result = await Axios.get(FinalQuery)

		setSearchedAnime(result.data.results)
	}

	useEffect(() => {
		// try {
		console.log('query :>> ', location.state.query)
		setQuery(location.state.query)
		setTags(location.state.tags)
		setFinalQuery('')
		// } catch (error) {
		// console.log('errore')
		// return
		// }

		searchAnime()
	}, [location, Query, Tags, FinalQuery])

	const tagSearch = (tag) => {
		history.push({
			pathname: '/search',
			search: '',
			state: { query: '', tags: [tag] },
		})
	}

	return (
		<div className='anime-list'>
			{Tags.map((tag) => {
				if (Tags.indexOf(tag) === Tags.length - 1) {
					return (
						<h5 key={tag} onClick={() => tagSearch(tag)}>
							{tagMap.get(tag)}
						</h5>
					)
				} else {
					return (
						<h5 key={tag} onClick={() => tagSearch(tag)}>
							{tagMap.get(tag)}
							{'>'}
						</h5>
					)
				}
			})}
			{SearchedAnime.map((anime) => (
				<AnimeCard key={anime.mal_id} {...anime} />
			))}
		</div>
	)
}

export default SearchResults

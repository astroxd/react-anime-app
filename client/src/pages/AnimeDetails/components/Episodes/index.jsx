import { useCallback, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SideAnimeCard from '../../../../components/SideAnimeCard'
import useEpisodes from './useEpisodes'

const Episodes = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [pageNumber, setPageNumber] = useState(1)

	const { episodes, loading, hasMore } = useEpisodes(id, pageNumber)

	const observer = useRef()
	const lastEpisodeRef = useCallback(
		(node) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1)
				}
			})
			if (node) observer.current.observe(node)
		},
		[loading, hasMore]
	)

	return (
		<div className='anime-details-sidebar'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Episodes</h5>
				</div>
			</div>
			{episodes.map((episode, idx) => {
				if (episodes.length === idx + 1 && pathname.endsWith('episodes')) {
					return (
						<div key={idx} ref={lastEpisodeRef}>
							<SideAnimeCard {...episode} />
						</div>
					)
				} else {
					return <SideAnimeCard key={idx} {...episode} />
				}
			})}
		</div>
	)
}

export default Episodes

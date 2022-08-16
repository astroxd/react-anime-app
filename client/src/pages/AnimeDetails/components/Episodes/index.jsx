import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import useAnimeDetails from '../../../../store/AnimeDetails/useAnimeDetails'
import SideEpisodeCard from './SideEpisodeCard'
import useEpisodes from './useEpisodes'

const Episodes = () => {
	let { pathname } = useLocation()

	const [pageNumber, setPageNumber] = useState(1)
	const {
		details: { idMal },
	} = useAnimeDetails()

	const { episodes, loading, hasMore } = useEpisodes(idMal, pageNumber)

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

	return !pathname.endsWith('episodes') ? (
		<div className='anime-details-sidebar episodes'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Episodes</h5>
				</div>
				<div className='section-button-all'>
					<Link to={`${pathname}/episodes`}>
						View All
						<FontAwesomeIcon icon={faLongArrowAltRight} />
					</Link>
				</div>
			</div>
			{episodes.slice(0, 3).map((episode, idx) => (
				<SideEpisodeCard key={idx} {...episode} />
			))}
		</div>
	) : (
		<div className='anime-details-sidebar episodes'>
			<Row>
				<Col>
					<div className='section-header'>
						<div className='section-title'>
							<h4>Episodes</h4>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				{episodes.map((episode, idx) => {
					if (episodes.length === idx + 1) {
						return (
							<Col xl={4} lg={4} md={6}>
								<div key={idx} ref={lastEpisodeRef}>
									<SideEpisodeCard {...episode} />
								</div>
							</Col>
						)
					} else {
						return (
							<Col xl={4} lg={6} md={6}>
								<SideEpisodeCard key={idx} {...episode} />
							</Col>
						)
					}
				})}
			</Row>
		</div>
	)
}

export default Episodes

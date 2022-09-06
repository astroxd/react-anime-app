import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import useDebounce from '../hooks/useDebounce'

import AnimeCard from './AnimeCard'

import Loader from './Loader'

const SectionWithSearch = ({
	sectionTitle,
	className,
	Animes,
	Search,
	ShowMore,
	Loading,
	ListID,
	Menu,
	Actions,
}) => {
	const [query, setQuery] = useState(null)

	const debouncedValue = useDebounce(query, 500)

	useEffect(() => {
		if (debouncedValue !== null) {
			Search(debouncedValue)
		}
	}, [debouncedValue])

	return (
		<section className={className}>
			<Container style={{ marginTop: '40px', marginBottom: '50px' }}>
				<Row>
					<div className='section-header'>
						<div className='section-title'>
							<h4>{sectionTitle}</h4>
						</div>
						<div className='section-search'>
							<input
								type='search'
								placeholder='Search Anime'
								value={query ?? ''}
								onChange={(e) => {
									setQuery(e.target.value)
								}}
							/>
						</div>
					</div>
				</Row>
				<Row>
					{Animes.map(({ animeId, animeCover, animeTitle }, idx) => (
						<Col xl={3} lg={4} md={6} sm={6} key={idx}>
							<AnimeCard
								id={animeId}
								coverImage={animeCover}
								title={animeTitle}
								contextMenu={Menu}
								list_id={ListID}
								actions={Actions}
							/>
						</Col>
					))}
					{Loading ? (
						<Loader />
					) : Animes.length > 0 ? (
						ShowMore && (
							<div className='show-more'>
								<span onClick={ShowMore}>Show More</span>
							</div>
						)
					) : (
						<div className='no-results'>No Results</div>
					)}
				</Row>
			</Container>
		</section>
	)
}

export default SectionWithSearch

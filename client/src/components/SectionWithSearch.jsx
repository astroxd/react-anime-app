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
}) => {
	const [query, setQuery] = useState('')

	const debouncedValue = useDebounce(query, 500)

	useEffect(() => {
		Search(debouncedValue)
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
								value={query}
								onChange={(e) => {
									setQuery(e.target.value)
								}}
							/>
						</div>
					</div>
				</Row>
				<Row>
					{Loading ? (
						<Loader />
					) : Animes.length > 0 ? (
						<>
							{Animes.map(({ anime_id, anime_cover, anime_title }, idx) => (
								<Col xl={3} lg={4} md={6} sm={6} key={idx}>
									<AnimeCard
										id={anime_id}
										coverImage={anime_cover}
										title={anime_title}
									/>
								</Col>
							))}
							{ShowMore && (
								<div className='show-more'>
									<span onClick={ShowMore}>Show More</span>
								</div>
							)}
						</>
					) : (
						<div
							style={{
								width: '100%',
								textAlign: 'center',
								color: 'var(--text-secondary)',
							}}
						>
							No Results
						</div>
					)}
				</Row>
			</Container>
		</section>
	)
}

export default SectionWithSearch

import { Col, Container, Row } from 'react-bootstrap'
import WatchlistCard from '../pages/WatchList/components/WatchlistCard'
import AnimeCard from './AnimeCard'

const SectionWithSearch = ({
	sectionTitle,
	className,
	Animes,
	Search,
	ShowMore,
}) => {
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
								onChange={(e) => {
									Search(e.target.value)
								}}
							/>
						</div>
					</div>
				</Row>
				<Row>
					{Animes.map(({ anime_id, anime_cover }, idx) => (
						<Col xl={3} lg={4} md={6} sm={6} key={idx}>
							<AnimeCard
								id={anime_id}
								coverImage={anime_cover}
								title={'cacca'}
							/>
						</Col>
					))}
					<div>
						{ShowMore && (
							<div className='show-more'>
								<span onClick={ShowMore}>Show More</span>
							</div>
						)}
					</div>
				</Row>
			</Container>
		</section>
	)
}

export default SectionWithSearch

import { Container, Row } from 'react-bootstrap'
import WatchlistCard from '../pages/WatchList/components/WatchlistCard'

const SectionWithSearch = ({
	Component,
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
				{/* <Component Anime={Anime} ShowMore={ShowMore} /> */}
				<Row>
					{Animes.map((anime, idx) => (
						<WatchlistCard anime={anime} idx={idx} key={idx} />
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

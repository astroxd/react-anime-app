import { Container, Row } from 'react-bootstrap'
import WatchlistCard from '../pages/WatchList/components/WatchlistCard'

const SectionWithSearch = ({ Animes, sectionTitle }) => {
	return (
		<section className='watchlist'>
			<Container style={{ marginTop: '40px', marginBottom: '50px' }}>
				<Row>
					<div className='section-header'>
						<div className='section-title'>
							<h4>{sectionTitle}</h4>
						</div>
						{/* TODO maybe remove View All button and lazy load all animes while scrolling down */}
						<div className='section-button-all'>
							<span>search bar</span>
							{/* <Link to='/'>
                        View All
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </Link> */}
						</div>
					</div>
				</Row>
				<Animes />
				{/* <Row>
					{animes.map((anime, idx) => (
						<WatchlistCard
							anime={anime}
							idx={idx}
							// reset={resetMenu}
							key={idx}
						/>
					))}
				</Row> */}
			</Container>
		</section>
	)
}

export default SectionWithSearch

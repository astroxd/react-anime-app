import { Container, Row } from 'react-bootstrap'
import WatchlistCard from '../pages/WatchList/components/WatchlistCard'

const SectionWithSearch = ({ Component, sectionTitle }) => {
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
						</div>
					</div>
				</Row>
				<Component />
			</Container>
		</section>
	)
}

export default SectionWithSearch

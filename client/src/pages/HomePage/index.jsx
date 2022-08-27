import { Container, Row, Col } from 'react-bootstrap'

import Carousel from '../../components/Carousel'
import { useCarouselAnimes } from '../../store/HomePage/useHomePageAnimes'

import TrendingNow from './components/TrendingNow'
import PopularThisSeason from './components/PopularThisSeason'
import NextSeason from './components/NextSeason'
import AllTimePopular from './components/AllTimePopular'

const HomePage = () => {
	const { animes } = useCarouselAnimes()

	return (
		<div>
			<section className='hero' style={{ overflow: 'hidden' }}>
				<Carousel animes={animes} />
			</section>
			<section className='content' style={{ paddingTop: '80px' }}>
				<Container>
					<Row>
						<Col lg={8}>
							<TrendingNow />
							<PopularThisSeason />
						</Col>
						<Col lg={4}>
							<NextSeason />
							<AllTimePopular />
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default HomePage

import { Container, Row, Col } from 'react-bootstrap'

import Carousel from '../../components/Carousel'
import { useCarouselAnimes } from '../../store/HomePage/useHomePageAnimes'

import TrendingNow from './components/TrendingNow'
import PopularThisSeason from './components/PopularThisSeason'
import NextSeason from './components/NextSeason'
import AllTimePopular from './components/AllTimePopular'

import Loader from '../../components/Loader'

const HomePage = () => {
	const { animes, loading } = useCarouselAnimes()

	return (
		<div>
			<section className='hero' style={{ overflow: 'hidden' }}>
				{/* {loading ? <Loader /> : <Carousel animes={animes} />} */}
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

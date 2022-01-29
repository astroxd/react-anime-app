import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SectionTemplate from './components/SectionTemplate'
import SideSection from './components/SideSection'
import TrendingNow from './components/TrendingNow'
import Carousel from '../../components/Carousel'
import { slides } from '../../helpers/animes'
import PopularThisSeason from './components/PopularThisSeason'
import NextSeason from './components/NextSeason'
import AllTimePopular from './components/AllTimePopular'

const HomePage = () => {
	return (
		<div>
			<section className='hero' style={{ overflow: 'hidden' }}>
				<Carousel slides={slides} />
			</section>
			<section className='content' style={{ paddingTop: '80px' }}>
				<Container>
					<Row>
						<Col lg={8}>
							<TrendingNow />
							<PopularThisSeason />
						</Col>
						<Col lg={4} md={6} sm={8}>
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

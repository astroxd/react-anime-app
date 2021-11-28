import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SectionTemplate from './components/SectionTemplate'
import SideSection from './components/SideSection'
import TrendingNow from './components/TrendingNow'
import Carousel from '../../components/Carousel'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'

const HomePage = () => {
	const slides = [
		{
			title:
				"The Story In Which I Was Kidnapped By A Young Lady's School To Be A “Sample Of The Common People”",
			cover: banner1,
			url: 'https://myanimelist.net/anime/1535/Death_Note',
			rank: 1,
		},
		{
			title: 'Shingeki no Kyojin',
			cover: banner2,
			url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin',
			rank: 2,
		},
		{
			title: 'Fullmetal Alchemist: Brotherhood',
			cover: banner3,
			url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
			rank: 3,
		},
	]

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
							<SectionTemplate animes={[]} sectionName='Seasonal' />
						</Col>
						<Col lg={4} md={6} sm={8}>
							<SideSection />
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default HomePage

import { Container, Carousel, CarouselItem, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TrendingNow from './components/TrendingNow'

const HomePage = () => {
	const slides = [
		{
			title: 'Death Note',
			cover:
				'https://cdn.myanimelist.net/images/anime/9/9453.jpg?s=b89e80691ac5cc0610847ccbe0b8424a',
			url: 'https://myanimelist.net/anime/1535/Death_Note',
			rank: 1,
		},
		{
			title: 'Shingeki no Kyojin',
			cover:
				'https://cdn.myanimelist.net/images/anime/10/47347.jpg?s=29949c6e892df123f0b0563e836d3d98',
			url: 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin',
			rank: 2,
		},
		{
			title: 'Fullmetal Alchemist: Brotherhood',
			cover:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
			rank: 3,
		},
	]

	return (
		<div>
			<section className='hero' style={{ overflow: 'hidden' }}>
				<Container>
					<Carousel pause='hover' prevIcon={prevIcon()} nextIcon={nextIcon()}>
						{slides.map((slide, idx) => {
							return (
								<CarouselItem key={idx}>
									<img className='carousel-image' src={slide.cover} alt='sao' />
									<Carousel.Caption>
										<div className='hero-anime-tag'>Action</div>
										<h2 className='hero-anime-title'>{slide.title}</h2>
										<p className='hero-anime-description'>Rank: {slide.rank}</p>
										<Link to='/' className='hero-anime-button'>
											<span>Watch Now</span>
											<i className='fa fa-angle-right'></i>
										</Link>
									</Carousel.Caption>
								</CarouselItem>
							)
						})}
					</Carousel>
				</Container>
			</section>
			<section className='content' style={{ paddingTop: '80px' }}>
				<Container>
					<Row>
						<Col lg={8}>
							<TrendingNow />
						</Col>
						<Col lg={4} md={6} sm={8}>
							<div className='sidebar'>
								<div className='sidebar-view'>
									<div className='section-title'>
										<h5>Top Views</h5>
									</div>
									<ul className='filter'>
										<li className='active'>Day</li>
										<li>Week</li>
										<li>Month</li>
										<li>Year</li>
									</ul>
									<div className='filter-gallery'>
										<div
											className='side-anime-card anime-card-image'
											style={{
												backgroundImage:
													'url(https://cdn.myanimelist.net/images/anime/9/9453.jpg?s=b89e80691ac5cc0610847ccbe0b8424a)',
											}}
										>
											<div className='episodes'>10 / 10</div>
											<div className='view'>
												<i
													className='fa fa-eye'
													style={{ marginRight: '4px' }}
												></i>
												9000
											</div>
											<h5>
												<Link to='/'>Death Note</Link>
											</h5>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default HomePage

const prevIcon = () => {
	return (
		<span aria-hidden='true' className='carousel-control-prev-icon-holder'>
			<span className='carousel-control-prev-icon'>
				<i className='fas fa-chevron-left'></i>
			</span>
		</span>
	)
}

const nextIcon = () => {
	return (
		<span aria-hidden='true' className='carousel-control-next-icon-holder'>
			<span className='carousel-control-next-icon'>
				<i className='fas fa-chevron-right'></i>
			</span>
		</span>
	)
}

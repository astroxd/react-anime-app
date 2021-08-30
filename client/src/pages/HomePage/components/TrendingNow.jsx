import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TrendingNow = () => {
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
			<div className='trending-now'>
				<Row>
					<Col lg={8} md={8} sm={8}>
						<div className='section-title'>
							<h4>Trending Now</h4>
						</div>
					</Col>
					<Col lg={4} md={4} sm={4}>
						<div className='button-all'>
							<Link to='/'>
								View All
								<i className='fas fa-long-arrow-alt-right'></i>
							</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col lg={4} md={6} sm={6}>
						<div className='anime-card'>
							<div
								className='anime-card-image'
								style={{
									backgroundImage:
										'url(https://cdn.myanimelist.net/images/anime/9/9453.jpg?s=b89e80691ac5cc0610847ccbe0b8424a)',
								}}
							>
								<div className='episodes'>10 / 10</div>
								<div className='view'>
									<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
									9000
								</div>
							</div>
							<div className='anime-card-text'>
								<ul>
									<li>Tag</li>
									<li>Tag</li>
								</ul>
								<h5>
									<Link to='/'>
										ANIddddddddddddddddddddddddddddddddddddddddddddddddddddME
									</Link>
								</h5>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default TrendingNow

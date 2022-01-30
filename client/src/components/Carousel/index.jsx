import { useEffect } from 'react'
import {
	CarouselItem,
	Container,
	Carousel as BSCarousel,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { nextIcon, prevIcon } from './components/Icons'

const Carousel = ({ animes }) => {
	useEffect(() => {
		console.log(animes)
	}, [])

	return (
		<Container>
			<BSCarousel
				pause='hover'
				fade
				prevIcon={prevIcon()}
				nextIcon={nextIcon()}
			>
				{animes.map((anime, idx) => {
					return (
						<CarouselItem key={idx}>
							<div className='carousel-image-container'>
								<img
									className='carousel-image'
									src={anime.bannerImage}
									alt='sao'
								/>
							</div>

							<BSCarousel.Caption>
								<div className='carousel-caption-container'>
									{anime.genres.map((genre, idy) => (
										<div className='hero-anime-tag' key={idy}>
											{genre}
										</div>
									))}

									<h2 className='hero-anime-title'>
										{anime.title?.english
											? anime.title.english
											: anime.title.romaji}
									</h2>
									{/* <p className='hero-anime-description'>Rank: {idx + 1}</p> */}
									<Link to='/' className='hero-anime-button '>
										<span className='primary-btn'>Watch Now</span>
										<i className='fa fa-angle-right'></i>
									</Link>
								</div>
							</BSCarousel.Caption>
						</CarouselItem>
					)
				})}
			</BSCarousel>
		</Container>
	)
}

export default Carousel

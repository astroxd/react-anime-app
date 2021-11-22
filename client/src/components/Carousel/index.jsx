import { useEffect } from 'react'
import {
	CarouselItem,
	Container,
	Carousel as BSCarousel,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { nextIcon, prevIcon } from './components/Icons'

const Carousel = ({ slides }) => {
	useEffect(() => {
		console.log(slides)
	}, [])

	return (
		<Container>
			<BSCarousel
				pause='hover'
				fade
				prevIcon={prevIcon()}
				nextIcon={nextIcon()}
			>
				{slides.map((slide, idx) => {
					return (
						<CarouselItem key={idx}>
							<div className='carousel-image-container'>
								<img className='carousel-image' src={slide.cover} alt='sao' />
							</div>

							{/* <BSCarousel.Caption>
								<div className='hero-anime-tag'>Action</div>
								<h2 className='hero-anime-title'>{slide.title}</h2>
								<p className='hero-anime-description'>Rank: {slide.rank}</p>
								<Link to='/' className='hero-anime-button'>
									<span>Watch Now</span>
									<i className='fa fa-angle-right'></i>
								</Link>
							</BSCarousel.Caption> */}
						</CarouselItem>
					)
				})}
			</BSCarousel>
		</Container>
	)
}

export default Carousel

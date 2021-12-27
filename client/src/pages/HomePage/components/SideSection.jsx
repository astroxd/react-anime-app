import { Link } from 'react-router-dom'
import { slides } from '../../../helpers/animes'

const SideSection = () => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Top Views</h5>
				</div>
			</div>
			{slides.map((slide, idx) => (
				<div
					key={idx}
					className='side-anime-card anime-card-image'
					style={{ backgroundImage: `url(${slide.cover})` }}
				>
					<div className='anime-card-image-overlay episodes'>{`${slide.episodes} / ${slide.episodes}`}</div>
					<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
						<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
						9000
					</div>
					<h5>
						<Link to='/'>{slide.title}</Link>
					</h5>
				</div>
			))}
		</div>
	)
}

export default SideSection

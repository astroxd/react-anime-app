import { Link } from 'react-router-dom'

const SideSection = () => {
	const slides = [
		{
			title: 'naruto the best anime ebvah pazzurod magico super figo',
			image:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			episodes: 20,
		},
		{
			title: 'naruto',
			image:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			episodes: 20,
		},
		{
			title: 'naruto',
			image:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			episodes: 20,
		},
		{
			title: 'naruto',
			image:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			episodes: 20,
		},
		{
			title: 'naruto',
			image:
				'https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f',
			episodes: 20,
		},
	]

	return (
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
					{slides.map((slide, idx) => (
						<div
							key={idx}
							className='side-anime-card anime-card-image'
							style={{ backgroundImage: `url(${slide.image})` }}
						>
							<div className='episodes'>{`${slide.episodes} / ${slide.episodes}`}</div>
							<div className='view'>
								<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
								9000
							</div>
							<h5>
								<Link to='/'>{slide.title}</Link>
							</h5>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SideSection

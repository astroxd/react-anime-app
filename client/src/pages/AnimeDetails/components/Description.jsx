import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AnimeDescription = () => {
	return (
		<div className='anime-details-content'>
			<Row>
				<Col lg={3}>
					<div
						className='anime-details-img'
						// style={{ backgroundImage: `url(${Details.image_url})` }}
						style={{
							backgroundImage: `url('https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f')`,
						}}
					>
						<div className='comments'>
							<i className='fas fa-comments'></i>
							{' 1000'}
						</div>
						<div className='view'>
							<i className='fas fa-eye'></i>
							{' 1000'}
						</div>
					</div>
				</Col>
				<Col lg={9}>
					<div className='anime-details-description'>
						<Row>
							<Col lg={9} md={9}>
								<div className='anime-details-title'>
									<h3>One Piece </h3>
									<span>Alt title </span>
								</div>
							</Col>
							<Col lg={3} md={3}>
								<div className='anime-details-rating'>
									<div className='rating'>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
									</div>
									<span>1.2000 Votes</span>
								</div>
							</Col>
						</Row>
						<p>Desc</p>
						<div className='anime-details-info'>
							<Row>
								<Col lg={6} md={6}>
									<ul>
										<li>
											<span>Type:</span>
											<p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
										</li>
										<li>
											<span>Studios:</span>
											<p>Studios</p>
										</li>
										<li>
											<span>Date Aired:</span>
											<p>Oct 02, 2019 to ?</p>
										</li>
										<li>
											<span>Status:</span>
											<p>Airing</p>
										</li>
										<li>
											<span>Genre:</span>
											<p>Action, Comedy, Adventure, Fantasy, Harem, Ecchi</p>
										</li>
									</ul>
								</Col>
								<Col lg={6} md={6}>
									<ul>
										<li>
											<span>Scores:</span>
											<p>7.31/1,515</p>
										</li>
										<li>
											<span>Rating:</span>
											<p>Rating</p>
										</li>
										<li>
											<span>Duration:</span>
											<p>24 min/ep</p>
										</li>
										<li>
											<span>Quality:</span>
											<p>HD</p>
										</li>
										<li>
											<span>Views:</span>
											<p>131,541</p>
										</li>
									</ul>
								</Col>
							</Row>
						</div>
						<div className='anime-details-buttons'>
							<button className='primary-btn'>
								<i className='far fa-heart'></i>
								{' Add to favorite list'}
							</button>
							<button className='primary-btn'>
								<i className='far fa-heart'></i>
								{' Add to watchlist'}
							</button>
							{/* <Link to='/'>
								<span>Add to watchlist</span>
								<i className='fas fa-angle-right'></i>
							</Link> */}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AnimeDescription

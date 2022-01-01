import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import cover1 from './../../../assets/images/cover1.jpg'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faComments,
	faEye,
	faStar,
	faListUl,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const AnimeDescription = () => {
	const [showDescription, setShowDescription] = useState(false)

	return (
		<div className='anime-details-content'>
			<Row>
				<Col lg={3}>
					<div className='anime-details-img'>
						<img src={cover1} alt='alt' />
						<div className='anime-card-image-overlay comments'>
							{/* <i className='fas fa-comments'></i> */}
							<FontAwesomeIcon icon={faComments} />
							{' 1000'}
						</div>
						<div className='anime-card-image-overlay view'>
							{/* <i className='fas fa-eye'></i> */}
							<FontAwesomeIcon icon={faEye} />
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
									<span>
										Alt title Lorem ipsum dolor sit amet consectetur adipisicing
									</span>
								</div>
							</Col>
							<Col lg={3} md={3}>
								<div className='anime-details-rating'>
									<div className='rating'>
										<FontAwesomeIcon icon={faStar} />
										<FontAwesomeIcon icon={faStar} />
										<FontAwesomeIcon icon={faStar} />
										<FontAwesomeIcon icon={faStar} />
										<FontAwesomeIcon icon={faStar} />
										{/* <i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i>
										<i className='fas fa-star'></i> */}
									</div>
									<span>1.2000 Votes</span>
								</div>
							</Col>
						</Row>
						{/* TODO: add show more if desc il longer than 5 rows */}
						<div className='description'>
							<p className={`${showDescription ? 'show' : ''}`}>
								Desc ipsum dolor sit amet consectetur adipisicing elit. Enim
								tempora hic eaque recusandae dignissimos voluptatem dolore
								tempora hic eaque recusandae dignissimos voluptatem dolore
								tempora hic eaque recusandae dignissimos voluptatem dolore
								tempora hic eaque recusandae dignissimos voluptatem dolore
								tempora hic eaque recusandae dignissimos voluptatem dolore hic
								eaque recusandae
							</p>
							<div
								className={`description-show-more ${
									showDescription ? 'hide' : ''
								}`}
								onClick={() => setShowDescription(!showDescription)}
							>
								{showDescription ? 'Show Less' : 'Show More'}
							</div>
						</div>
						<div className='anime-details-info'>
							<Row>
								<Col lg={6} md={6}>
									<ul>
										<li>
											<span>Type:</span>
											<p>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Minus placeat voluptatibus voluptatem, architecto
												assumenda voluptas iusto quo officiis cum fuga quasi
												eaque facilis velit sint officia autem adipisci cumque
												facere ut aperiam minima aut. Optio porro a aliquid
												corrupti consequatur. ipsum dolor sit amet
											</p>
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
								{/* <i className='far fa-heart'></i> */}
								<FontAwesomeIcon icon={faHeart} />
								{' Add to favorite list'}
							</button>
							<button className='primary-btn'>
								{/* <i className='far fa-heart'></i> */}
								<FontAwesomeIcon icon={faListUl} />
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

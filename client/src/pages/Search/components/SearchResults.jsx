import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import cover1 from '../../../assets/images/cover1.jpg'
import cover2 from '../../../assets/images/cover2.jpg'
import cover3 from '../../../assets/images/cover3.jpg'
const SearchResults = ({ anime }) => {
	const covers = [cover1, cover2, cover3]

	return (
		<section
			className='search-result'
			style={{ marginTop: '40px', marginBottom: '60px' }}
		>
			<Container>
				<Row>
					<Col>
						<div className='section-header'>
							<div className='section-title'>
								<h4>Results</h4>
							</div>
							<div className='order-by'>
								<span>Order by:</span>
								<select name='' id=''>
									<option value=''>A-Z</option>
								</select>
							</div>
							<span className='search-query'>Search for Naruto</span>
							<div className='inline-pagination'>
								<Link to='/' className='pagination-indicator first current'>
									<span>1</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>2</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>...</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>3</span>
								</Link>
								<Link to='/' className='pagination-indicator'>
									<span>4</span>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					{anime.map((anime, idx) => (
						<Col xl={3} lg={4} md={6} sm={6} key={idx}>
							<div className='anime-card'>
								<div className='anime-card-image'>
									<Link
										to={`/anime/${anime.mal_id}`}
										href={anime.url}
										target='_blank'
										rel='noreferrer'
									>
										<img
											src={covers[Math.floor(Math.random() * covers.length)]}
											alt={`${anime.title} image`}
										/>
									</Link>
									<div className='anime-card-image-overlay episodes'>{`${anime.episodes} / ${anime.episodes}`}</div>
									<div className='anime-card-image-overlay view'>
										<FontAwesomeIcon icon={faEye} />
										{anime.members}
									</div>
								</div>
								<div className='anime-card-text'>
									{/* <ul>
											{genres.map((genre, idx) => (
												<li key={idx}>
													<Link to='/'>{genre.name}</Link>
												</li>
											))}
										</ul> */}
									<h5>
										<Link
											to={`/anime/${anime.mal_id}`}
											href={anime.url}
											target='_blank'
											rel='noreferrer'
										>
											{anime.title}
										</Link>
									</h5>
								</div>
							</div>
						</Col>
					))}
				</Row>
				<Row style={{ marginTop: '20px' }}>
					<Col>
						<div className='pagination'>
							<Link to='/' className='pagination-indicator '>
								<FontAwesomeIcon icon={faAngleDoubleLeft} />
							</Link>
							<Link to='/' className='pagination-indicator current'>
								<span>1</span>
							</Link>
							<Link to='/' className='pagination-indicator'>
								<span>2</span>
							</Link>
							<Link to='/' className='pagination-indicator'>
								<span>...</span>
							</Link>
							<Link to='/' className='pagination-indicator'>
								<span>3</span>
							</Link>
							<Link to='/' className='pagination-indicator'>
								<span>4</span>
							</Link>
							<Link to='/' className='pagination-indicator'>
								<FontAwesomeIcon icon={faAngleDoubleRight} />
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default SearchResults

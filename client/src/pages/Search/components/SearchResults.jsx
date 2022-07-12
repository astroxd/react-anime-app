import { Link } from 'react-router-dom'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import Loader from '../../../components/Loader'

const SearchResults = ({
	animes,
	query,
	currentPage,
	updatePage,
	loading,
	pageInfo,
	options,
}) => {
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
							<span className='search-query'>
								Search for &quot;{query}&quot;
							</span>
							<div className='inline-pagination'>
								{Array.from({ length: 5 }, (_, i) => ++i).map((page, idx) => (
									<span
										key={idx}
										className={`pagination-indicator ${
											page === currentPage ? 'current' : ''
										}`}
										onClick={() => updatePage(page)}
									>
										{page}
									</span>
								))}
							</div>
						</div>
					</Col>
				</Row>
				{/*  TODO create Anime Card component without Col specification */}
				<Row style={{ marginTop: '20px' }}>
					{loading ? (
						<Loader />
					) : animes.length > 0 ? (
						animes.map((anime, idx) => (
							<Col xl={3} lg={4} md={6} sm={6} key={idx}>
								<div className='anime-card'>
									<div className='anime-card-image'>
										<Link
											to={`/anime/${anime.id}`}
											// href={anime.url}
											target='_blank'
											rel='noreferrer'
										>
											<img
												src={anime.coverImage.large}
												alt={`${anime.title.english} image`}
											/>
										</Link>
										<div className='anime-card-image-overlay episodes'>{`${
											anime.nextAiringEpisode
												? anime.nextAiringEpisode.episode
												: anime.episodes
										} / ${anime.episodes ? anime.episodes : '?'}`}</div>
										<div className='anime-card-image-overlay view'>
											<FontAwesomeIcon icon={faEye} />
											{anime.popularity}
										</div>
									</div>
									<div className='anime-card-text'>
										<ul>
											{anime.genres.map((genre, idx) => (
												<li key={idx}>
													<span>{genre}</span>
												</li>
											))}
										</ul>
										<h5>
											<Link
												to={`/anime/${anime.id}`}
												// href={anime.url}
												target='_blank'
												rel='noreferrer'
											>
												{anime.title.english
													? anime.title.english
													: anime.title.romaji}
											</Link>
										</h5>
									</div>
								</div>
							</Col>
						))
					) : (
						<div
							style={{
								width: '100%',
								textAlign: 'center',
								color: 'var(--text-secondary)',
							}}
						>
							No Results
						</div>
					)}
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

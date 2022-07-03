import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import useSearch from './useSearch'

const SearchResults = ({
	animes,
	query,
	page,
	updatePage,
	loading,
	pageInfo,
	options,
}) => {
	console.log(pageInfo)
	console.log(animes.length * page, pageInfo.total)
	console.log(animes.length * page < pageInfo.total)

	//* total, last page are bugged, it gives the right values when reach last page + 1
	let { results, hasMore, error } = useSearch(query, page + 1, options)

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
								<h5>{page}</h5>
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
								<span
									className='pagination-indicator current'
									onClick={() => updatePage(page)}
								>
									{page}
								</span>
								{pageInfo.hasNextPage && results.length > 0 ? (
									<span
										className='pagination-indicator'
										onClick={() => updatePage(page + 1)}
									>
										{page + 1}
									</span>
								) : (
									<></>
								)}

								{/* <span className='pagination-indicator'>...</span>
								<span className='pagination-indicator'>3</span>
								<span className='pagination-indicator'>4</span> */}
							</div>
						</div>
					</Col>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					{animes.map((anime, idx) => (
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
												<Link to='/'>{genre}</Link>
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

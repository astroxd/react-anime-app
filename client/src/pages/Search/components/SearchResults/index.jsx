import { Col, Container, Row } from 'react-bootstrap'

import { sortOptions } from '../searchOptions'

import AnimeCard from '../../../../components/AnimeCard'

import Loader from '../../../../components/Loader'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
// 	faAngleDoubleLeft,
// 	faAngleDoubleRight,
// } from '@fortawesome/free-solid-svg-icons'

//* Style
import './SearchResults.css'

const SearchResults = ({
	animes,
	query,
	currentPage,
	updatePage,
	sort,
	updateSort,
	loading,
	// pageInfo,
	// options,
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
								<select
									name='sort'
									value={sort}
									onChange={(e) => updateSort(e.target.value)}
								>
									{sortOptions.map(({ name, showName }) => (
										<option value={name} key={name}>
											{showName}
										</option>
									))}
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
				<Row style={{ marginTop: '20px' }}>
					{loading ? (
						<Loader />
					) : animes.length > 0 ? (
						animes.map((anime, idx) => (
							<Col xl={3} lg={4} md={6} sm={6} key={idx}>
								<AnimeCard {...anime} />
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
				{/* Can't use pagination with api */}
				{/* <Row style={{ marginTop: '20px' }}>
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
				</Row> */}
			</Container>
		</section>
	)
}

export default SearchResults

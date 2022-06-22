import { Col, Row, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import CharacterCard from './CharacterCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { useRef, useCallback, useState } from 'react'
import useCharacters from './useCharacters'

const Characters = ({ id }) => {
	let { pathname } = useLocation()

	const [pageNumber, setPageNumber] = useState(1)

	// TODO Follow this for api data
	const { characters, loading, hasMore } = useCharacters(id, pageNumber)

	const observer = useRef()
	const lastCharacterRef = useCallback(
		(node) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1)
				}
			})
			if (node) observer.current.observe(node)
		},
		[loading, hasMore]
	)

	return (
		<div className='anime-details-character'>
			<Row>
				<Col>
					<div className='section-header'>
						<div className='section-title'>
							<h5>Characters</h5>
						</div>
						{!pathname.endsWith('characters') && (
							<div className='section-button-all'>
								<Link to={`${pathname}/characters`}>
									View All
									<FontAwesomeIcon icon={faLongArrowAltRight} />
								</Link>
							</div>
						)}
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='characters'>
						{characters.map((character, idx) => {
							if (
								characters.length === idx + 1 &&
								pathname.endsWith('characters')
							) {
								return (
									<div key={idx} ref={lastCharacterRef}>
										<CharacterCard {...character} />
									</div>
								)
							} else {
								return <CharacterCard key={idx} {...character} />
							}
						})}

						{loading && (
							<div className='loading'>
								<Spinner animation='border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							</div>
						)}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Characters

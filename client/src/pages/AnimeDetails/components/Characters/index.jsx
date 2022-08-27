import { useRef, useCallback, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import CharacterCard from './CharacterCard'
import useCharacters from './useCharacters'

import Loader from '../../../../components/Loader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

//* Style
import './Characters.css'

const Characters = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [pageNumber, setPageNumber] = useState(1)

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
							{pathname.endsWith('characters') ? (
								<h4>Characters</h4>
							) : (
								<h5>Characters</h5>
							)}
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
					<div
						className={`characters ${
							pathname.endsWith('characters') ? 'full' : ''
						}`}
					>
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

						{loading && <Loader />}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Characters

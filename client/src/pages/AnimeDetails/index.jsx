import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router'
import Loader from '../../components/Loader'
import useAnimeDetails from '../../store/AnimeDetails/useAnimeDetails'
import Characters from './components/Characters'
import AnimeDescription from './components/Description'
import Recommendations from './components/Recommendations'
import Tags from './components/Tags'

const AnimeDetails = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [isCharactersPage, setCharactersPage] = useState(false)

	const { storedId, setId, details, tags, recommendations, loading } =
		useAnimeDetails()

	useEffect(() => {
		if (id !== storedId) setId(id)

		if (pathname.endsWith('characters')) {
			setCharactersPage(true)
		} else {
			setCharactersPage(false)
		}
	}, [pathname])

	return loading ? (
		<Loader />
	) : (
		<section className='anime-details'>
			<Container>
				{details && <AnimeDescription {...details} />}

				<Row>
					{isCharactersPage ? (
						<Col>
							<Characters id={id} />
						</Col>
					) : (
						<>
							<Col lg={8}>
								{tags && <Tags tags={tags} />}

								<Characters id={id} />
							</Col>
							<Col lg={4}>
								{recommendations && (
									<Recommendations recommendations={recommendations} />
								)}
							</Col>
						</>
					)}
				</Row>
			</Container>
		</section>
	)
}

export default AnimeDetails

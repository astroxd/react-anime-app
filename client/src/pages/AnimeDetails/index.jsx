import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams, useLocation, Outlet } from 'react-router'
import Loader from '../../components/Loader'
import useAnimeDetails from '../../store/AnimeDetails/useAnimeDetails'
import AnimeDescription from './components/Details/Description'

const AnimeDetails = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const [isCharactersPage, setCharactersPage] = useState(false)

	const { storedId, setId, details, loading } = useAnimeDetails()

	useEffect(() => {
		if (id !== storedId) setId(id)

		if (pathname.endsWith('characters')) {
			setCharactersPage(true)
		} else {
			setCharactersPage(false)
		}
	}, [pathname])

	return loading ? (
		<section
			style={{ height: '90vmin', display: 'flex', alignItems: 'center' }}
		>
			<Loader />
		</section>
	) : (
		<section className='anime-details'>
			<Container>
				{details && <AnimeDescription {...details} />}
				<Outlet />
				{/* <Row>
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
				</Row> */}
			</Container>
		</section>
	)
}

export default AnimeDetails

import { useEffect } from 'react'
import { useParams, useLocation, Outlet } from 'react-router'
import { Container } from 'react-bootstrap'

import PageLoader from '../../components/PageLoader'

import useAnimeDetails from '../../store/AnimeDetails/useAnimeDetails'

import AnimeDescription from './components/Details/Description'

//* Style
import './AnimeDetails.css'

const AnimeDetails = () => {
	let { id } = useParams()
	let { pathname } = useLocation()

	const { storedId, setId, details, loading } = useAnimeDetails()

	useEffect(() => {
		if (id !== storedId) setId(id)
	}, [pathname])

	return loading ? (
		<PageLoader />
	) : (
		<section className='anime-details'>
			<Container>
				{details && <AnimeDescription {...details} />}
				<Outlet />
			</Container>
		</section>
	)
}

export default AnimeDetails

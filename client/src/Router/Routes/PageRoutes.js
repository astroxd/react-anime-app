import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from '../../components/Loadable'

import MainLayout from '../../Layouts/MainLayout'

//* Routes
const HomePage = Loadable(lazy(() => import('../../pages/HomePage')))

import Search from '../../pages/Search'

import AnimeDetails from '../../pages/AnimeDetails'
import Characters from '../../pages/AnimeDetails/components/Characters'
import Details from '../../pages/AnimeDetails/components/Details'
import Episodes from '../../pages/AnimeDetails/components/Episodes'

import AuthRoutes from './AuthRoutes'
import PrivateRoutes from './PrivateRoutes'
import NoRoute from './NoRoute'

const PageRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '',
			element: <HomePage />,
		},

		{
			path: 'search',
			element: <Search />,
		},
		{
			path: 'anime',
			element: <Navigate to='/' replace />,
		},
		{
			path: 'anime/:id',
			element: <AnimeDetails />,
			children: [
				{
					path: '',
					element: <Details />,
				},
				{
					path: 'characters',
					element: <Characters />,
				},
				{
					path: 'episodes',
					element: <Episodes />,
				},
			],
		},
		...AuthRoutes,
		...PrivateRoutes,
		...NoRoute,
	],
}

export default PageRoutes

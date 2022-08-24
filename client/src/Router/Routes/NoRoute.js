import { lazy } from 'react'
import Loadable from '../../components/Loadable'

//* Routes
const NotFound = Loadable(lazy(() => import('../../components/NotFound')))

const NoRoute = [
	{
		path: '*',
		element: <NotFound />,
	},
]

export default NoRoute

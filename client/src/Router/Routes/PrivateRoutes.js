import PrivateRoute from '../../components/PrivateRoute'

//* Routes
import InProgress from '../../components/InProgress'
import WatchList from '../../pages/WatchList'
import FavoriteList from '../../pages/Favorites'

const PrivateRoutes = [
	{
		element: <PrivateRoute />,
		children: [
			{ path: 'settings', element: <InProgress /> },
			{ path: 'profile', element: <InProgress /> },
			{ path: 'watchlist', element: <WatchList /> },
			{ path: 'favorites', element: <FavoriteList /> },
		],
	},
]

export default PrivateRoutes

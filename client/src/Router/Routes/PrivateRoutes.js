import PrivateRoute from '../../components/PrivateRoute'

//* Routes
import InProgress from '../../components/InProgress'
import WatchList from '../../pages/WatchList'
import FavoriteList from '../../pages/Favorites'

import Profile from '../../pages/Profile'
import Overview from '../../pages/Profile/components/Overview'

const PrivateRoutes = [
	{
		element: <PrivateRoute />,
		children: [
			{ path: 'settings', element: <InProgress /> },
			{
				path: 'profile',
				element: <Profile />,
				children: [
					{
						path: '',
						element: <Overview />,
					},
					{
						path: 'lists',
						element: <div>lists</div>,
					},
					{
						path: 'favorites',
						element: <div>favorites</div>,
					},
					{
						path: 'statistics',
						element: <div>statistics</div>,
					},
				],
			},
			{ path: 'watchlist', element: <WatchList /> },
			{ path: 'favorites', element: <FavoriteList /> },
		],
	},
]

export default PrivateRoutes

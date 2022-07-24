import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
// import PrivateRoute from './components/PrivateRoute'
import AnimeDetails from './pages/AnimeDetails/'
// import FavoriteList from './pages/Profile/components/FavoriteList'
import HomePage from './pages/HomePage/'
import Login from './pages/Login/'
import Register from './pages/Register/'

import WatchList from './pages/WatchList'
import Search from './pages/Search'
import Settings from './pages/Settings'
import PrivateRoute from './components/PrivateRoute'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/'>
						<Route index element={<HomePage />} />
						<Route path='search' element={<Search />} />
						<Route path='anime/:id'>
							<Route index element={<AnimeDetails />} />
							<Route path='characters' element={<AnimeDetails />} />
						</Route>
						<Route path='watchlist' element={<WatchList />} />

						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />

						{/* Private routes based on user logged in */}
						<Route element={<PrivateRoute />}>
							<Route path='settings' element={<Settings />} />
							<Route path='profile' element={<div>profile</div>} />
						</Route>
					</Route>
					<Route path='*' element={<div>Not found</div>} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App

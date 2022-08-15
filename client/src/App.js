import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AnimeDetails from './pages/AnimeDetails/'
import HomePage from './pages/HomePage/'
import Login from './pages/Login/'
import Register from './pages/Register/'

import WatchList from './pages/WatchList'
import Search from './pages/Search'
import PrivateRoute from './components/PrivateRoute'
import InProgress from './components/InProgress'
import NotFound from './components/NotFound'
import Favorites from './pages/Favorites'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Characters from './pages/AnimeDetails/components/Characters'
import Details from './pages/AnimeDetails/components/Details'

function App() {
	return (
		<div className='App'>
			<ToastContainer />

			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/'>
						<Route index element={<HomePage />} />
						<Route path='search' element={<Search />} />
						<Route path='anime/:id' element={<AnimeDetails />}>
							<Route index element={<Details />} />
							<Route path='characters' element={<Characters />} />
							<Route path='episodes' element={<AnimeDetails />} />
						</Route>

						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />

						{/* Private routes based on user logged in */}
						<Route element={<PrivateRoute />}>
							<Route path='settings' element={<InProgress />} />
							<Route path='profile' element={<InProgress />} />
							<Route path='watchlist' element={<WatchList />} />
							<Route path='favorites' element={<Favorites />} />
						</Route>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App

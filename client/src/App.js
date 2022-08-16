import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage/'
import Search from './pages/Search'

import AnimeDetails from './pages/AnimeDetails/'
import Details from './pages/AnimeDetails/components/Details'
import Characters from './pages/AnimeDetails/components/Characters'
import Episodes from './pages/AnimeDetails/components/Episodes'

import Login from './pages/Login/'
import Register from './pages/Register/'

import PrivateRoute from './components/PrivateRoute'
import WatchList from './pages/WatchList'
import Favorites from './pages/Favorites'

import InProgress from './components/InProgress'
import NotFound from './components/NotFound'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
							<Route path='episodes' element={<Episodes />} />
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

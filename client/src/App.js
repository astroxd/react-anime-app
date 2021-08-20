import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar'
import AnimeDetails from './pages/AnimeDetails'
import FavoriteList from './pages/FavoriteList'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import TopAnimeList from './pages/TopAnimeList'
import WatchList from './pages/WatchList'

function App() {
	return (
		<Router>
			<Navbar />
			<Sidebar />

			<div className='App'>
				<Switch>
					<Route path='/' exact component={TopAnimeList} />
					<Route path='/search' component={SearchResults} />
					<Route path='/anime/:id' component={AnimeDetails} />
					<PrivateRoute component={WatchList} path='/watchlist' />
					<PrivateRoute component={FavoriteList} path='/favorite' />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</div>
		</Router>
	)
}

export default App

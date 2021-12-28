import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AnimeDetails from './pages/AnimeDetails/'
import FavoriteList from './pages/FavoriteList'
import HomePage from './pages/HomePage/'
import Login from './pages/Login/'
import Register from './pages/Register/'
import SearchResults from './pages/SearchResults'
import TopAnimeList from './pages/TopAnimeList'
import WatchList from './pages/Profile/WatchList'

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Switch>
					<Route path='/' exact component={HomePage} />
					{/* <Route path='/' exact component={TopAnimeList} /> */}
					<Route path='/search' component={SearchResults} />
					<Route path='/anime/:id' component={AnimeDetails} />
					{/* <PrivateRoute component={WatchList} path='/watchlist' /> */}
					<Route path='/watchlist' component={WatchList} />
					<PrivateRoute component={FavoriteList} path='/favorite' />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
				<Footer />
			</div>
		</Router>
	)
}

export default App

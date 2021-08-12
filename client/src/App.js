import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Searchbar from './components/Searchbar'
import AnimeDetails from './pages/AnimeDetails'
import Login from './pages/Login'
import SearchResults from './pages/SearchResults'
import TopAnimeList from './pages/TopAnimeList'
import WatchList from './pages/WatchList'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='App'>
				<Searchbar />
				<Switch>
					<Route path='/' exact component={TopAnimeList} />
					<Route path='/search' component={SearchResults} />
					<Route path='/anime/:id' component={AnimeDetails} />
					<PrivateRoute component={WatchList} path='/watchlist' />
					{/* <Route path='/watchlist' component={WatchList} /> */}
					<Route path='/login' component={Login} />
				</Switch>
			</div>
		</Router>
	)
}

export default App

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import AnimeDetails from './pages/AnimeDetails'
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
					<Route path='/watchlist' component={WatchList} />
				</Switch>
			</div>
		</Router>
	)
}

export default App

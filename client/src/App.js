import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import SearchResults from './pages/SearchResults'
import TopAnimeList from './pages/TopAnimeList'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='App'>
				<Searchbar />
				<Switch>
					<Route path='/' exact component={TopAnimeList} />
					<Route path='/search' exact component={SearchResults} />
				</Switch>
			</div>
		</Router>
	)
}

export default App

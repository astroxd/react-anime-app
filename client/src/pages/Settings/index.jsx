import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from './components/Header'
import Profile from './components/Profile'

const Settings = () => {
	let { path } = useRouteMatch()

	return (
		<section className='settings'>
			<Header />
			<Switch>
				<Route exact to={`${path}`}>
					<Profile />
				</Route>
				<Route to={`${path}/profile`}>
					<Profile />
				</Route>
			</Switch>
		</section>
	)
}

export default Settings

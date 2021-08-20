import { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import getUser from '../helpers/auth'
const PrivateRoute = ({ component: Component }) => {
	const location = useLocation()
	console.log(location)
	const [logIn, setLogIn] = useState()

	const GetSession = async () => {
		const user = await getUser()
		if (user && user.data) {
			console.log(user.data.logged)
			if (user.data.logged === true) {
				setLogIn(true)
			} else [setLogIn(false)]
		}
	}

	useEffect(() => {
		GetSession()
	}, [])

	if (logIn === true) {
		return <Component />
	} else if (logIn === false) {
		return (
			<Redirect
				to={{ pathname: '/login', state: { next: location.pathname } }}
			/>
		)
	} else {
		return <div>loading</div>
	}
}

export default PrivateRoute

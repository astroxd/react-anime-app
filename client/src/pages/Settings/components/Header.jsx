import { Link, useRouteMatch } from 'react-router-dom'

const Header = () => {
	let { url } = useRouteMatch()
	return (
		<section className='settings-header'>
			<Link to={`${url}/profile`}>Profile</Link>
		</section>
	)
}

export default Header

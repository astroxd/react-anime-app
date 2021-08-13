import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
	const location = useLocation()
	const [path, setPath] = useState('/')

	useEffect(() => {
		setPath(location.pathname)
	}, [location])

	return (
		<aside className='sidebar'>
			<ul className='sidebar-side'>
				<li className='side-item'>
					<Link
						to='/'
						className={`side-link ${path === '/' ? 'active-path' : ''}`}
					>
						<div className='link-text'>Top Anime</div>
					</Link>
				</li>
				<li className='side-item'>
					<Link
						to='/seasonal'
						className={`side-link ${path === '/seasonal' ? 'active-path' : ''}`}
					>
						<div className='link-text'>Seasonal</div>
					</Link>
				</li>
				<li className='side-item'>
					<Link
						to='/login'
						className={`side-link ${path === '/login' ? 'active-path' : ''}`}
					>
						<div className='link-text'>Login</div>
					</Link>
				</li>
			</ul>
		</aside>

		// <aside className='sidebar'>
		// 	<ul className='sidebar-side'>
		// 		<li className='logo'>
		// 			<a href='#' className='side-link'>
		// 				<span className='link-text'>Anime</span>
		// 			</a>
		// 		</li>
		// 		<li className='side-item'>
		// 			<Link to='/' className='side-link'>
		// 				<span className='link-text'>Top Anime</span>
		// 			</Link>
		// 		</li>
		// 		<li className='side-item'>
		// 			<Link to='/seasonal' className='side-link'>
		// 				<span className='link-text'>Seasonal</span>
		// 			</Link>
		// 		</li>
		// 		<li className='side-item'>
		// 			<Link to='/watchlist' className='side-link'>
		// 				<span className='link-text'>Watch List</span>
		// 			</Link>
		// 		</li>
		// 		<li className='side-item'>
		// 			<Link to='/login' className='side-link'>
		// 				<span className='link-text'>Login</span>
		// 			</Link>
		// 		</li>
		// 	</ul>
		// </aside>
	)
}

export default Sidebar

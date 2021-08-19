import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Searchbar from './Searchbar'

const Navbar = () => {
	const selector = useSelector((state) => state.user)

	const [state, setstate] = useState(true)

	const location = useLocation()
	const [path, setPath] = useState('/')

	const getSession = () => {
		if (selector) {
			console.log(selector.logged)
			setstate(selector.logged)
		}
	}

	useEffect(() => {
		getSession()
		setPath(location.pathname)
	}, [location, selector])

	return (
		<nav className='navbar'>
			<div className='logo'>
				<div className='logo-text'>ANIME</div>
			</div>
			<div className='mid-content'>
				<Searchbar />

				<div className='user-stuff'>
					<Link to='/watchlist' className='user-link'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-6 w-6 ${
								path === '/watchlist' ? 'user-link-selected' : ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
							/>
						</svg>
					</Link>
					<Link to='/favorite' className='user-link'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-6 w-6 ${
								path === '/favorite' ? 'user-link-selected' : ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
							/>
						</svg>
					</Link>
					<Link to='/' className='user-link'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-6 w-6 ${
								path === '/user' ? 'user-link-selected' : ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</Link>

					{state ? 'logged' : 'login'}
				</div>
			</div>
		</nav>
	)
}

export default Navbar

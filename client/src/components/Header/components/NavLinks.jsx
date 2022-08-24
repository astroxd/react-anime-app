import { NavLink } from 'react-router-dom'

const NavLinks = () => {
	return (
		<div>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? 'nav-link nav-active' : 'nav-link'
						}
					>
						Homepage
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='watchlist'
						className={({ isActive }) =>
							isActive ? 'nav-link nav-active' : 'nav-link'
						}
					>
						Watchlist
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='search'
						className={({ isActive }) =>
							isActive ? 'nav-link nav-active' : 'nav-link'
						}
					>
						Search Anime
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						to='favorites'
						className={({ isActive }) =>
							isActive ? 'nav-link nav-active' : 'nav-link'
						}
					>
						Favorites
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default NavLinks

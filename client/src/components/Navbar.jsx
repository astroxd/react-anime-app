import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav className='navbar'>
			<ul className='navbar-nav'>
				<li className='logo'>
					<a href='#' className='nav-link'>
						<span className='link-text'>Anime</span>
					</a>
				</li>
				<li className='nav-item'>
					<Link to='/' className='nav-link'>
						<span className='link-text'>Top Anime</span>
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/seasonal' className='nav-link'>
						<span className='link-text'>Seasonal</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar

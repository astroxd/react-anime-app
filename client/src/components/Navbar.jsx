import Searchbar from './Searchbar'
const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='logo'>
				<div className='logo-text'>ANIME</div>
			</div>
			<div className='mid-content'>
				<Searchbar />

				<div className='user-stuff'>user</div>
			</div>
		</nav>
	)
}

export default Navbar

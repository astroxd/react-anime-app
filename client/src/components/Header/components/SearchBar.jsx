import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
	const navigate = useNavigate()

	const gotoSearch = (e) => {
		e.preventDefault()

		const query = e.target[0].value
		e.target[0].value = ''

		navigate(`/search?query=${query}`, { state: { search: query } })
	}
	return (
		<div className='search-bar'>
			<form onSubmit={(e) => gotoSearch(e)}>
				<input
					type='text'
					className='search-bar-input'
					placeholder='Search...'
				/>
				<button className='search-bar-button' type='submit'>
					<FontAwesomeIcon
						icon={faSearch}
						style={{ verticalAlign: 'middle' }}
					/>
				</button>
			</form>
		</div>
	)
}

export default SearchBar

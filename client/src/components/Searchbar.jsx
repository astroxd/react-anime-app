import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import tagMap from '../helpers/tag-map'

const Searchbar = () => {
	const history = useHistory()

	const [Query, setQuery] = useState('')

	const [Tags, setTags] = useState([])

	const searchAnime = (e) => {
		e.preventDefault()
		console.log(Tags)
		history.push({
			pathname: '/search',
			search: Query,
			state: { query: Query, tags: Tags },
		})

		console.log('sto pushando ' + Query)

		setTags([])
		setQuery('')
	}

	const showMenu = () => {
		document.getElementById('dropdownID').classList.toggle('show')
	}

	window.onclick = function (event) {
		if (
			!event.target.matches('.dropbtn') &&
			!event.target.matches('.dropdown-item')
		) {
			document.getElementById('dropdownID').classList.remove('show')
		}
	}

	const addTag = (tag) => {
		if (Tags.includes(tag)) {
			setTags(Tags.filter((item) => item !== tag))
		} else {
			setTags([...Tags, tag])
		}
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<div className='dropdown'>
				<button className='dropbtn' onClick={showMenu}>
					Tag
				</button>
				<div className='dropdown-content' id='dropdownID'>
					<div className='content-grid'>
						{[...tagMap.entries()].map((result) => (
							<li
								key={result[0]}
								className={`dropdown-item +
									${Tags.includes(result[0]) ? 'dropdown-content-selected' : ''}`}
								onClick={() => addTag(result[0])}
							>
								{result[1]}
							</li>
						))}
					</div>
				</div>
			</div>
			<form onSubmit={(e) => searchAnime(e)}>
				<input
					value={Query}
					className='search-box'
					type='search'
					placeholder='Search for anime...'
					onChange={(e) => setQuery(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default Searchbar

// 'dropdown-item' +
// 									(this.Tags.includes(result[0])
// 										? 'dropdown-content-selected'
// 										: '')

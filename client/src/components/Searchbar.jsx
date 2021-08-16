import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import tagMap from '../helpers/tag-map'

const Searchbar = () => {
	const history = useHistory()

	const [Query, setQuery] = useState('')

	const [Tags, setTags] = useState([])

	const searchAnime = (e) => {
		e.preventDefault()
		history.push({
			pathname: '/search',
			search:
				Tags.length > 0 ? `?query=${Query}&tags=${Tags}` : `?query=${Query}`,
			state: { query: Query, tags: Tags },
		})

		setTags([])
		setQuery('')
	}

	const showMenu = () => {
		const element = document.getElementById('dropdownID')
		element.classList.toggle('show')
	}

	window.onclick = function (event) {
		if (
			!event.target.matches('.dropbtn') &&
			!event.target.matches('.dropbtn-content') &&
			!event.target.matches('.dropbtn-text') &&
			!event.target.matches('.dropbtn-icon') &&
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
		<div className='search-bar' onSubmit={(e) => searchAnime(e)}>
			<form className='search-form'>
				<input
					value={Query}
					className='search-box'
					type='search'
					placeholder='Search...'
					onChange={(e) => setQuery(e.target.value)}
				/>
			</form>

			<div className='dropdown'>
				<button className='dropbtn' onClick={showMenu}>
					<div className='dropbtn-content' id='dropdown'>
						<div className='dropbtn-text'>Categories</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 dropbtn-icon'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</button>
				<div className='dropdown-content' id='dropdownID'>
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

			<button
				type='submit'
				className='searchbtn'
				onClick={(e) => searchAnime(e)}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 searchbtn-icon'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					/>
				</svg>
			</button>
		</div>
	)
}

export default Searchbar

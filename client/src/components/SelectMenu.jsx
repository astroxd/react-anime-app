import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useClickOutside } from './useClickOutsideHook'
import { useEffect, useState } from 'react'
const SelectMenu = ({ sendSelection, multiple, removeSelectionId }) => {
	// const options = ['Shounen', 'Vampire', 'Cars']
	const options = [
		{ id: 1, title: 'Shounen' },
		{ id: 2, title: 'Vampire' },
		{ id: 3, title: 'Cars' },
	]

	const [selectedOptions, setSelectedOptions] = useState([])

	const [ShowMenu, setShowMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowMenu(false)
	})

	const addToSelection = (object) => {
		if (object === undefined) return

		let filteredResult = selectedOptions

		if (multiple) {
			if (selectedOptions.some((option) => option.id === object.id)) {
				filteredResult = selectedOptions.filter(
					(option) => option.id !== object.id
				)
			} else {
				filteredResult = [...selectedOptions, object]
			}
		} else {
			filteredResult = [object]
		}

		if (!multiple) {
			console.log(filteredResult[0].id)
			//* if in single selection the clicked element is the same as before prevent update
			if (filteredResult[0].id === selectedOptions[0]?.id) return
		}
		setSelectedOptions(filteredResult)
		sendSelection(filteredResult)
	}

	useEffect(() => {
		addToSelection(removeSelectionId)
		return () => {}
	}, [removeSelectionId])

	return (
		<div className='select' ref={domNode}>
			<div className='select-button' onClick={() => setShowMenu(!ShowMenu)}>
				<div>
					<span>
						{selectedOptions.length > 0 ? selectedOptions[0].title : 'Genres'}
						{selectedOptions.length > 1 && '+' + selectedOptions.length - 1}
					</span>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
			<div className={`select-menu ${ShowMenu ? 'show' : ''}`}>
				<ul>
					{options.map((option, idx) => {
						return (
							<li
								className={`${
									selectedOptions.some((object) => object.id === option.id)
										? 'selected'
										: ''
								}`}
								key={idx}
								onClick={() => {
									addToSelection(option)
									setShowMenu(false)
								}}
							>
								{option.title}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default SelectMenu

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useClickOutside } from './useClickOutsideHook'
import { useEffect, useState } from 'react'
const SelectMenu = ({
	menuTitle,
	sendSelection,
	multiple,
	removeSelectionObj,
}) => {
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
		let filteredResult

		if (multiple) {
			if (selectedOptions.some((option) => option.id === object.id)) {
				removeFromSelection(object)
				return //* removeFromSelection already update list so prevent update from this fn
			} else {
				filteredResult = [...selectedOptions, object]
			}
		} else {
			//* if in single selection the clicked element is the same as before prevent update
			if (object.id === selectedOptions[0]?.id) return
			filteredResult = [object]
		}

		setSelectedOptions(filteredResult)
		sendSelection(filteredResult)
	}

	const removeFromSelection = (object) => {
		if (object === undefined) return

		let filteredResult
		filteredResult = selectedOptions.filter((option) => option.id !== object.id)

		setSelectedOptions(filteredResult)
		sendSelection(filteredResult)
	}

	useEffect(() => {
		removeFromSelection(removeSelectionObj)
		return () => {}
	}, [removeSelectionObj])

	return (
		<div className='select' ref={domNode}>
			<div
				className='select-button'
				onClick={() => setShowMenu(!ShowMenu)}
				tabIndex={0}
			>
				<div>
					<div className='select-button-content'>
						{selectedOptions.length > 0 ? (
							<span className='tag'>{selectedOptions[0].title}</span>
						) : (
							<span className='title'>{menuTitle}</span>
						)}
						{selectedOptions.length > 1 && (
							<span className='tag'>{`+${selectedOptions.length - 1}`}</span>
						)}
					</div>
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
									if (!multiple) {
										setShowMenu(false)
									}
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

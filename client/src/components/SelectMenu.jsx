import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useClickOutside } from './useClickOutsideHook'
import { useEffect, useState } from 'react'
const SelectMenu = ({
	menuTitle,
	options,
	sendSelection,
	multiple,
	removeSelectionObj,
	alreadySelected,
}) => {
	//* if multiple: alreadySelected will be an array (?? prevent null value)
	//* else: if alreadySelected exists: create array with it else: empty array
	const [selectedOptions, setSelectedOptions] = useState(
		multiple ? alreadySelected ?? [] : alreadySelected ? [alreadySelected] : []
	)

	const [showMenu, setShowMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowMenu(false)
	})

	const addToSelection = (object) => {
		let filteredResult

		if (multiple) {
			if (selectedOptions.some((option) => option.name === object.name)) {
				removeFromSelection(object)
			} else {
				filteredResult = [...selectedOptions, object]
				setSelectedOptions(filteredResult) //* Array
				sendSelection(filteredResult) //* Array
			}
		} else {
			//* if in single selection the clicked element is the same as before prevent update
			if (object.name === selectedOptions[0]?.name) return

			filteredResult = object
			setSelectedOptions([filteredResult]) //* Array
			sendSelection(filteredResult) //* Object
		}
	}

	const removeFromSelection = (object) => {
		if (object === undefined) return

		if (!multiple) {
			setSelectedOptions([])
			sendSelection(undefined)
		} else {
			let filteredResult
			filteredResult = selectedOptions.filter(
				(option) => option.name !== object.name
			)

			setSelectedOptions(filteredResult) //* Array
			sendSelection(filteredResult) //* Array
		}
	}

	useEffect(() => {
		removeFromSelection(removeSelectionObj)
	}, [removeSelectionObj])

	useEffect(() => {
		console.log(alreadySelected)
	}, [alreadySelected])

	return (
		<div className='select' ref={domNode}>
			<div
				className='select-button'
				onClick={() => setShowMenu(!showMenu)}
				tabIndex={0}
			>
				<div>
					<div className='select-button-content'>
						{selectedOptions.length > 0 ? (
							<span className='tag'>
								{selectedOptions[0]?.showName ?? 'Error No Name'}
							</span>
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
			<div className={`select-menu ${showMenu ? 'show' : ''}`}>
				<ul>
					{options.map((option, idx) => {
						return (
							<li
								className={`${
									selectedOptions.some((object) => object?.name === option.name)
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
								{option.showName}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default SelectMenu

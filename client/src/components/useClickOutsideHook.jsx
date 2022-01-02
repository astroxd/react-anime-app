import { useEffect, useRef } from 'react'

export const useClickOutside = (handler) => {
	let domNode = useRef()

	useEffect(() => {
		let maybeHandler = (event) => {
			let closest = event.target.closest('.more-options')
			if (closest === null) {
				handler()
			}
			//* Using ref the click is scoped to the single card and
			//* will close the other menus when clicking another
			// if (!domNode.current.contains(event.target)) {
			// 	handler()
			// }
		}

		document.addEventListener('mousedown', maybeHandler)

		return () => {
			document.removeEventListener('mousedown', maybeHandler)
		}
	})

	return domNode
}

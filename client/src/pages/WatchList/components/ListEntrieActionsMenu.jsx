import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'

const ListEntrieActionsMenu = ({ list_id, anime_id, actions }) => {
	const [showContextMenu, setShowContextMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowContextMenu(false)
	})

	const [removeFromList] = actions

	return (
		<div
			className='anime-card-image-overlay more-options'
			onClick={() => setShowContextMenu(!showContextMenu)}
			ref={domNode}
		>
			<FontAwesomeIcon icon={faBars} />
			<div className={`dropdown-menu ${showContextMenu ? 'show' : ''}`}>
				<ul>
					<li
						className='dropdown-menu-item'
						onClick={() => removeFromList.action(list_id, anime_id)}
					>
						{removeFromList.name}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default ListEntrieActionsMenu

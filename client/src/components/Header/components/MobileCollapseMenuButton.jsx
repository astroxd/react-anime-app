import { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MobileCollapseMenuButton = ({
	showCollapseMenu,
	setShowCollapseMenu,
}) => {
	const handleResize = (e) => {
		const MAXMEDIUMSIZEBP = 992

		const windowWidth = e.target.innerWidth
		if (windowWidth >= MAXMEDIUMSIZEBP) {
			setShowCollapseMenu(false)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<button
			className='primary-btn collapse-btn'
			onClick={() => setShowCollapseMenu(!showCollapseMenu)}
		>
			<span>Menu</span>
			<FontAwesomeIcon icon={faBars} style={{ verticalAlign: 'middle' }} />
		</button>
	)
}

export default MobileCollapseMenuButton

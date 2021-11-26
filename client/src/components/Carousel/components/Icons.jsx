import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export const prevIcon = () => {
	return (
		<span aria-hidden='true' className='carousel-control-prev-icon-holder'>
			<span className='carousel-control-prev-icon'>
				<FontAwesomeIcon icon={faChevronLeft} />
			</span>
		</span>
	)
}

export const nextIcon = () => {
	return (
		<span aria-hidden='true' className='carousel-control-next-icon-holder'>
			<span className='carousel-control-next-icon'>
				<FontAwesomeIcon icon={faChevronRight} />
			</span>
		</span>
	)
}

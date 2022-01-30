import { Link } from 'react-router-dom'
import { slides } from '../../../helpers/animes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

const Related = () => {
	return (
		<div className='anime-details-sidebar'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>You Might Like...</h5>
				</div>
			</div>
			{/* TODO  check SideSection comment */}
			<div
				className='side-anime-card anime-card-image'
				// style={{ backgroundImage: `url(${cover1})` }}
				style={{ backgroundImage: `url(${slides[0].cover})` }}
			>
				<div className='anime-card-image-overlay episodes'>{`10 / 10`}</div>
				<div className='anime-card-image-overlay side-anime-card-image-overlay-view'>
					<FontAwesomeIcon icon={faEye} style={{ marginRight: '4px' }} />
					9000
				</div>
				<h5>
					<Link to='/'>Titolo dello anime molto interessante</Link>
				</h5>
			</div>
		</div>
	)
}

export default Related

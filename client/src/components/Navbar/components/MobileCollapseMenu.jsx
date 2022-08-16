import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const MobileCollapseMenu = ({ showMenu }) => {
	return (
		<Row className={`nav-collapse-menu ${showMenu ? 'show' : ''}`}>
			<Col>
				<div style={{ padding: '1rem 0' }}>
					<ul>
						<li className='nav-collapse-item'>
							<Link to='/' className='nav-collapse-link'>
								Homepage
							</Link>
						</li>
						<li className='nav-collapse-item'>
							<Link to='/watchlist' className='nav-collapse-link'>
								Watchlist
							</Link>
						</li>
						<li className='nav-collapse-item'>
							<Link to='/search' className='nav-collapse-link'>
								Search Anime
							</Link>
						</li>
						<li className='nav-collapse-item'>
							<Link to='/favorites' className='nav-collapse-link'>
								Favorites
							</Link>
						</li>
					</ul>
				</div>
			</Col>
		</Row>
	)
}

export default MobileCollapseMenu

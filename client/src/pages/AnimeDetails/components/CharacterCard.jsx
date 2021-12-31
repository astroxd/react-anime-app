import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const CharacterCard = () => {
	return (
		<div className='character-card'>
			<Row>
				<Col
				// style={{ paddingRight: '0' }}
				>
					<Link to='/' className='character-card-link'>
						<div className='character-card-left'>
							<img
								src=' https://s4.anilist.co/file/anilistcdn/character/large/b40-q0YepZ4VUZUO.png'
								alt='alt'
							/>

							<div className='description'>
								<div className='content'>
									<FontAwesomeIcon icon={faCaretRight} />
									{/* <i className='fas fa-caret-right'></i> */}
									<div>
										<div className='role'>Main</div>
										<div className='name'>Luffy</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</Col>
				<Col
				// style={{ paddingLeft: '0' }}
				>
					<Link to='/' className='character-card-link'>
						<div className='character-card-right'>
							<div className='description'>
								<div className='content'>
									<div>
										<div className='name'>Luffy</div>
										<div className='role'>Main</div>
									</div>
									<FontAwesomeIcon icon={faCaretLeft} />
									{/* <i className='fas fa-caret-left'></i> */}
								</div>
							</div>
							<img
								src=' https://s4.anilist.co/file/anilistcdn/staff/large/n95075-1qD4TeW1ON92.png'
								alt='alt'
							/>
						</div>
					</Link>
				</Col>
			</Row>
		</div>
	)
}

export default CharacterCard

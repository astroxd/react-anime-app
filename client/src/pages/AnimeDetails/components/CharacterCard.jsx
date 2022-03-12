import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const CharacterCard = ({
	node: {
		name,
		image: { large: characterImage },
	},
	role,
	voiceActors,
}) => {
	const getCharacterName = () => {
		const { first, middle, last } = name
		let fullName = first

		if (middle !== null) {
			fullName = fullName.concat(` ${middle}`)
		}
		if (last !== null) {
			fullName = fullName.concat(` ${last}`)
		}
		return fullName
	}

	// TODO fix card
	return (
		<div className='character-card'>
			<Row>
				<Col
				// style={{ paddingRight: '0' }}
				>
					<Link to='/' className='character-card-link'>
						<div className='character-card-left'>
							<img src={`${characterImage}`} alt={getCharacterName()} />

							<div className='description'>
								<div className='content'>
									<FontAwesomeIcon icon={faCaretRight} />
									<div>
										<div className='role'>{role}</div>
										<div className='name'>{getCharacterName()}</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</Col>
				<Col
				//  style={{ paddingLeft: '0' }}
				>
					<Link to='/' className='character-card-link'>
						<div className='character-card-right'>
							<div className='description'>
								<div className='content'>
									<div>
										<div className='name'>{voiceActors[0]?.name?.full}</div>
										<div className='role'>{voiceActors[0]?.languageV2}</div>
									</div>
									<FontAwesomeIcon icon={faCaretLeft} />
								</div>
							</div>
							<img
								src={voiceActors[0]?.image?.large}
								alt={voiceActors[0]?.name?.full}
							/>
						</div>
					</Link>
				</Col>
			</Row>
		</div>
	)
}

export default CharacterCard

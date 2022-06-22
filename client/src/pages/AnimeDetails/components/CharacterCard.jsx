import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { getCharacterName } from '../../../helpers/formattedAnimeDetails'
const CharacterCard = ({
	node: {
		name,
		image: { large: characterImage },
	},
	role,
	voiceActors,
}) => {
	return (
		<div className='character-card'>
			<Row>
				<Col>
					<div className='character-card-left'>
						<img src={`${characterImage}`} alt={getCharacterName(name)} />

						<div className='description'>
							<div className='content'>
								<FontAwesomeIcon icon={faCaretRight} />
								<div>
									<div className='role'>{role}</div>
									<div className='name'>{getCharacterName(name)}</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
				<Col>
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
				</Col>
			</Row>
		</div>
	)
}

export default CharacterCard

import { Col, Row } from 'react-bootstrap'
import useAnimeDetails from '../../../../store/AnimeDetails/useAnimeDetails'
import Characters from '../Characters'
import Episodes from '../Episodes'
import Recommendations from './Recommendations'
import Tags from './Tags'

const Details = () => {
	const { tags, recommendations } = useAnimeDetails()

	return (
		<Row>
			<Col lg={8}>
				{tags && <Tags tags={tags} />}
				<Characters />
			</Col>
			<Col lg={4}>
				<Episodes />
				{recommendations && (
					<Recommendations recommendations={recommendations} />
				)}
			</Col>
		</Row>
	)
}

export default Details

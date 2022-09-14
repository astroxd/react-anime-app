import { Col, Container, Row } from 'react-bootstrap'

import ThemedChart from '../../../../components/Charts'

const Overview = () => {
	const data = {
		data: {
			Dec: 9,
			Jan: 4,
			Feb: 10,
			Mar: 4,
			Apr: 0,
			May: 2,
			Jun: 3,
		},
	}

	const options = {
		chart: {
			id: 'basic-bar',
		},
		title: {
			text: 'Animes Watched',
		},
		subtitle: {
			text: '2022',
		},
	}

	return (
		<Container>
			<Row>
				<Col lg={6} md={12}>
					<ThemedChart options={options} data={data} type='area' />
				</Col>
				<Col>Graph 2</Col>
			</Row>
		</Container>
	)
}

export default Overview

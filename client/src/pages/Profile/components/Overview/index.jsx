import { Col, Container, Row } from 'react-bootstrap'
import Chart from 'react-apexcharts'

import BaseOptionChart from '../../../../components/Charts'
import merge from 'lodash/merge'

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

	const chartOptions = merge(BaseOptionChart(), {
		chart: {
			id: '#anime',
		},
		title: {
			text: 'Animes Watched',
		},
		subtitle: {
			text: '2022',
		},
		xaxis: {
			categories: Object.keys(data.data),
		},
	})

	const chartSeries = [
		{
			name: 'data',
			data: Object.values(data.data),
		},
	]

	const barOptions = merge(BaseOptionChart(), {
		chart: {
			id: '#hours',
		},
		title: {
			text: 'Hours spent',
		},
		subtitle: {
			text: '2022',
		},
		xaxis: {
			categories: Object.keys(data.data),
		},
	})

	return (
		<Container>
			<Row>
				<Col lg={6} md={12}>
					<Chart options={chartOptions} series={chartSeries} type='area' />
				</Col>
				<Col>
					<Chart options={barOptions} series={chartSeries} type='bar' />
				</Col>
			</Row>
		</Container>
	)
}

export default Overview

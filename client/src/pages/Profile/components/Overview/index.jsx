import { Col, Container, Row } from 'react-bootstrap'

import Chart from 'react-apexcharts'

const Overview = () => {
	const data = {
		Dec: 9,
		Jan: 4,
		Feb: 10,
		Mar: 4,
		Apr: 0,
		May: 2,
		Jun: 3,
	}

	const options = {
		options: {
			chart: {
				id: 'basic-bar',
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
			},
			fill: {
				colors: '#e53636',
				gradient: {
					shade: 'dark',
					shadeIntensity: 0,
				},
			},
			stroke: {
				curve: 'smooth',
				colors: ['#e53636'],
			},
			markers: {
				size: 4,
				colors: '#e53636',
			},
			dataLabels: {
				enabled: true,
				offsetY: -8,
				background: {
					enabled: false,
				},
				style: {
					colors: ['#e53636'],
				},
			},
			title: {
				text: 'Animes Watched',
				align: 'center',
				style: {
					fontSize: '22px',
					fontWeight: 'bold',
					fontFamily: 'Oswald',
					color: '#fff',
				},
			},
			subtitle: {
				text: '2022',
				align: 'center',
				style: {
					fontSize: '22px',
					fontWeight: 'bold',
					fontFamily: 'Oswald',
					color: '#e53636',
				},
			},
			tooltip: { enabled: false },
			xaxis: {
				categories: [
					...Object.keys(data),
					// 'Jan',
					// 'Feb',
					// 'Mar',
					// 'Apr',
					// 'May',
					// 'June',
					// 'July',
					// 'Aug',
					// 'Sep',
					// 'Oct',
					// 'Nov',
					// 'Dec',
				],
				labels: {
					style: {
						colors: '#fff',
					},
				},
			},
			grid: {
				show: false,
			},
			yaxis: {
				show: false,
			},
		},
		series: [
			{
				name: '#Animes',
				data: [
					// 30, 40, 45, 50, 49, 60, 70, 91, 0, 3, 20, 100
					...Object.values(data),
				],
			},
		],
	}

	return (
		<Container>
			<Row>
				<Col lg={6} md={12}>
					<Chart
						options={options.options}
						series={options.series}
						type='area'
						// width='500'
					/>
				</Col>
				<Col>Graph 2</Col>
			</Row>
		</Container>
	)
}

export default Overview

import Chart from 'react-apexcharts'

const ThemedChart = ({ type, options, data, overwrite }) => {
	const defaultOptions = {
		chart: {
			id: options.chart.id.toString(),
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
		},
		tooltip: { enabled: false },
		grid: {
			show: false,
		},
		yaxis: {
			show: false,
		},

		theme: {
			mode: 'light',
			monochrome: {
				enabled: true,
				color: '#e53636',
			},
		},
		stroke: {
			curve: 'smooth',
		},
		fill: {
			gradient: {
				shade: 'dark',
				shadeIntensity: 0,
			},
		},
		markers: {
			size: 4,
		},
		dataLabels: {
			enabled: true,
			offsetY: -8,
			background: {
				enabled: false,
			},
		},
		title: {
			text: options?.title?.text,
			align: 'center',
			style: {
				fontSize: '22px',
				fontWeight: 'bold',
				fontFamily: 'Oswald',
				color: '#fff',
			},
		},
		subtitle: {
			text: options?.subtitle?.text,
			align: 'center',
			style: {
				fontSize: '22px',
				fontWeight: 'bold',
				fontFamily: 'Oswald',
				color: '#e53636',
			},
		},

		xaxis: {
			categories: Object.keys(data.data),
			labels: {
				style: {
					colors: '#fff',
				},
			},
		},
	}

	const series = [
		{
			name: 'data',
			data: Object.values(data.data),
		},
	]

	return (
		<Chart
			options={overwrite ? options : defaultOptions}
			series={series}
			type={type}
		/>
	)
}

export default ThemedChart

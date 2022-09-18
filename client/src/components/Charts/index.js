const BaseOptionChart = () => {
	return {
		chart: {
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
			align: 'center',
			style: {
				fontSize: '22px',
				fontWeight: 'bold',
				fontFamily: 'Oswald',
				color: '#fff',
			},
		},
		subtitle: {
			align: 'center',
			style: {
				fontSize: '22px',
				fontWeight: 'bold',
				fontFamily: 'Oswald',
				color: '#e53636',
			},
		},

		xaxis: {
			labels: {
				style: {
					colors: '#fff',
				},
			},
		},
	}
}

export default BaseOptionChart

import RecommendationsCard from './RecommendationsCard'

const Recommendations = ({ recommendations }) => {
	console.log(recommendations)
	return (
		<div className='anime-details-sidebar'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>You Might Like...</h5>
				</div>
			</div>
			{recommendations &&
				recommendations.map((recommendation, idx) => {
					return <RecommendationsCard key={idx} {...recommendation} />
				})}
		</div>
	)
}

export default Recommendations

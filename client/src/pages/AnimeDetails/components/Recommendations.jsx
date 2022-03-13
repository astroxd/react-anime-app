import SideAnimeCard from '../../../components/SideAnimeCard'

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
					console.log(recommendation.node.mediaRecommendation)
					return (
						<SideAnimeCard
							key={idx}
							{...recommendation.node.mediaRecommendation}
						/>
					)
				})}
		</div>
	)
}

export default Recommendations

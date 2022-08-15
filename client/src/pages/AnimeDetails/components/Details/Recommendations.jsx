import SideAnimeCard from '../../../../components/SideAnimeCard'

const Recommendations = ({ recommendations }) => {
	return (
		<div className='anime-details-sidebar'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>You Might Like...</h5>
				</div>
			</div>
			{recommendations.map((recommendation, idx) => {
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

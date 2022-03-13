import SideAnimeCard from '../../../components/SideAnimeCard'
const SideSection = ({ animes, sectionName }) => {
	return (
		<div style={{ marginBottom: '50px' }}>
			<div className='section-header'>
				<div className='section-title'>
					<h5>{sectionName}</h5>
				</div>
			</div>
			{animes.map((anime, idx) => (
				<SideAnimeCard key={idx} {...anime} />
			))}
		</div>
	)
}

export default SideSection

const SideEpisodeCard = ({
	mal_id,
	title,
	images: {
		jpg: { image_url: bannerImage },
	},
}) => {
	return (
		<div
			className='side-anime-card anime-card-image'
			style={{
				backgroundImage: `url(${bannerImage})`,
			}}
		>
			<h5 className='title'>
				<span className='episode-number'>{mal_id}</span>
				{`. ${title}`}
			</h5>
		</div>
	)
}

export default SideEpisodeCard

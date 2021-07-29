// eslint-disable-next-line no-unused-vars
const AnimeCard = ({ mal_id: id, title, image_url: cover, url }) => {
	return (
		<div className='anime-card'>
			<a
				href={url}
				className='anime-card-content'
				target='_blank'
				rel='noreferrer'
			>
				<img src={cover} alt={`${title} cover`} className='anime-card-cover' />
				<h3>{title}</h3>
			</a>
		</div>
	)
}

export default AnimeCard

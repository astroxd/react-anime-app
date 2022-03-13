const Tags = ({ tags }) => {
	// TODO remove hover effect
	return (
		<div className='anime-details-tags'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Tags</h5>
				</div>
			</div>
			<div className='tags'>
				{tags.tags.map((tag) => (
					<span key={tag.id} className='tag no-hover'>
						{tag.name}
					</span>
				))}
			</div>
		</div>
	)
}

export default Tags

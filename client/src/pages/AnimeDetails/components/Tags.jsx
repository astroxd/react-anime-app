import { Link } from 'react-router-dom'

const Tags = ({ tags }) => {
	return (
		<div className='anime-details-tags'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Tags</h5>
				</div>
			</div>
			<div className='tags'>
				{tags.tags.map((tag) => (
					<span key={tag.id} className='tag'>
						{tag.name}
					</span>
				))}
			</div>
		</div>
	)
}

export default Tags

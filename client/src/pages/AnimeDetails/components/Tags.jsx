import { Link } from 'react-router-dom'

const Tags = () => {
	return (
		<div className='anime-details-tags'>
			<div className='section-header'>
				<div className='section-title'>
					<h5>Tags</h5>
				</div>
			</div>
			<div className='tags'>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Piracy</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
				<Link to='/' className='tag'>
					<span>Skeleton</span>
				</Link>
			</div>
		</div>
	)
}

export default Tags

import { Link } from 'react-router-dom'

const Related = () => {
	return (
		<div className='anime-details-sidebar'>
			<div className='section-title'>
				<h5>You Might Like...</h5>
			</div>
			<div
				className='side-anime-card anime-card-image'
				style={{
					backgroundImage: `url(https://cdn.myanimelist.net/images/anime/1223/96541.jpg?s=faffcb677a5eacd17bf761edd78bfb3f)`,
				}}
			>
				<div className='episodes'>{`10 / 10`}</div>
				<div className='view'>
					<i className='fa fa-eye' style={{ marginRight: '4px' }}></i>
					9000
				</div>
				<h5>
					<Link to='/'>
						{"NOME DELL'ANIME SUPER FIGO ASSURDO PAZZO FURIOSO"}
					</Link>
				</h5>
			</div>
		</div>
	)
}

export default Related

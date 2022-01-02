import { Row } from 'react-bootstrap'
import WatchlistCard from './WatchlistCard'

const WatchList = ({ Anime, ShowMore }) => {
	return (
		<Row>
			{Anime.map((anime, idx) => (
				<WatchlistCard anime={anime} idx={idx} key={idx} />
			))}
			<div>
				{ShowMore && (
					<div className='show-more'>
						<span onClick={ShowMore}>Show More</span>
					</div>
				)}
			</div>
		</Row>
	)
}

export default WatchList

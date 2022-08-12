import useHomePageStore from './useHomePageStore'
import shallow from 'zustand/shallow'

const useCarouselAnimes = () => {
	const { animes, loading, getCarouselAnimes } = useHomePageStore(
		(state) => ({
			animes: state.carousel.animes,
			loading: state.carousel.loading,
			getCarouselAnimes: state.getCarouselAnimes,
		}),
		shallow
	)
	return { animes, loading, getCarouselAnimes }
}

const useTrendingNowAnimes = () => {
	const { animes, loading, getTrendingNowAnimes } = useHomePageStore(
		(state) => ({
			animes: state.trendingNow.animes,
			loading: state.trendingNow.loading,
			getTrendingNowAnimes: state.getTrendingNowAnimes,
		}),
		shallow
	)
	return { animes, loading, getTrendingNowAnimes }
}

const usePopularThisSeasonAnimes = () => {
	const { animes, loading, getPopularThisSeasonAnimes } = useHomePageStore(
		(state) => ({
			animes: state.popularThisSeason.animes,
			loading: state.popularThisSeason.loading,
			getPopularThisSeasonAnimes: state.getPopularThisSeasonAnimes,
		}),
		shallow
	)
	return { animes, loading, getPopularThisSeasonAnimes }
}
const useNextSeasonAnimes = () => {
	const { animes, loading, getNextSeasonAnimes } = useHomePageStore(
		(state) => ({
			animes: state.nextSeason.animes,
			loading: state.nextSeason.loading,
			getNextSeasonAnimes: state.getNextSeasonAnimes,
		}),
		shallow
	)
	return { animes, loading, getNextSeasonAnimes }
}
const useAllTimePopularAnimes = () => {
	const { animes, loading, getAllTimePopularAnimes } = useHomePageStore(
		(state) => ({
			animes: state.allTimePopular.animes,
			loading: state.allTimePopular.loading,
			getAllTimePopularAnimes: state.getAllTimePopularAnimes,
		}),
		shallow
	)
	return { animes, loading, getAllTimePopularAnimes }
}

export {
	useCarouselAnimes,
	useTrendingNowAnimes,
	usePopularThisSeasonAnimes,
	useNextSeasonAnimes,
	useAllTimePopularAnimes,
}

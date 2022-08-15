import useHomePageStore from './useHomePageStore'
import shallow from 'zustand/shallow'
import { useEffect } from 'react'

const useCarouselAnimes = () => {
	const { animes, loading, hasData, getCarouselAnimes } = useHomePageStore(
		(state) => ({
			animes: state.carousel.animes,
			loading: state.carousel.loading,
			hasData: state.carousel.hasData,
			getCarouselAnimes: state.getCarouselAnimes,
		}),
		shallow
	)

	useEffect(() => {
		if (!hasData) getCarouselAnimes()
	}, [hasData])

	return { animes, loading, hasData, getCarouselAnimes }
}

const useTrendingNowAnimes = () => {
	const { animes, loading, hasData, getTrendingNowAnimes } = useHomePageStore(
		(state) => ({
			animes: state.trendingNow.animes,
			loading: state.trendingNow.loading,
			hasData: state.trendingNow.hasData,
			getTrendingNowAnimes: state.getTrendingNowAnimes,
		}),
		shallow
	)
	useEffect(() => {
		if (!hasData) getTrendingNowAnimes()
	}, [hasData])

	return { animes, loading, hasData, getTrendingNowAnimes }
}

const usePopularThisSeasonAnimes = () => {
	const { animes, loading, hasData, getPopularThisSeasonAnimes } =
		useHomePageStore(
			(state) => ({
				animes: state.popularThisSeason.animes,
				loading: state.popularThisSeason.loading,
				hasData: state.popularThisSeason.hasData,
				getPopularThisSeasonAnimes: state.getPopularThisSeasonAnimes,
			}),
			shallow
		)
	useEffect(() => {
		if (!hasData) getPopularThisSeasonAnimes()
	}, [hasData])

	return { animes, loading, hasData, getPopularThisSeasonAnimes }
}
const useNextSeasonAnimes = () => {
	const { animes, loading, hasData, getNextSeasonAnimes } = useHomePageStore(
		(state) => ({
			animes: state.nextSeason.animes,
			loading: state.nextSeason.loading,
			hasData: state.nextSeason.hasData,
			getNextSeasonAnimes: state.getNextSeasonAnimes,
		}),
		shallow
	)
	useEffect(() => {
		if (!hasData) getNextSeasonAnimes()
	}, [hasData])

	return { animes, loading, hasData, getNextSeasonAnimes }
}
const useAllTimePopularAnimes = () => {
	const { animes, loading, hasData, getAllTimePopularAnimes } =
		useHomePageStore(
			(state) => ({
				animes: state.allTimePopular.animes,
				loading: state.allTimePopular.loading,
				hasData: state.allTimePopular.hasData,
				getAllTimePopularAnimes: state.getAllTimePopularAnimes,
			}),
			shallow
		)
	useEffect(() => {
		if (!hasData) getAllTimePopularAnimes()
	}, [hasData])

	return { animes, loading, hasData, getAllTimePopularAnimes }
}

export {
	useCarouselAnimes,
	useTrendingNowAnimes,
	usePopularThisSeasonAnimes,
	useNextSeasonAnimes,
	useAllTimePopularAnimes,
}

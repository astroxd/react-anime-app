import create from 'zustand'
import {
	getCarouselAnimes,
	getTrendingNowAnimes,
	getPopularThisSeasonAnimes,
	getNextSeasonAnimes,
	getAllTimePopularAnimes,
} from './getAnimes'

const initialState = {
	carousel: { loading: false, animes: [] },
	trendingNow: { loading: false, animes: [] },
	popularThisSeason: { loading: false, animes: [] },
	nextSeason: { loading: false, animes: [] },
	allTimePopular: { loading: false, animes: [] },
	error: '',
}

const useHomePageStore = create(() => ({
	...initialState,

	getCarouselAnimes,
	getTrendingNowAnimes,
	getPopularThisSeasonAnimes,
	getNextSeasonAnimes,
	getAllTimePopularAnimes,
}))

export default useHomePageStore

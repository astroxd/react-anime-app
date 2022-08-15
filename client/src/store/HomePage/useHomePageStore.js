import create from 'zustand'
import {
	getCarouselAnimes,
	getTrendingNowAnimes,
	getPopularThisSeasonAnimes,
	getNextSeasonAnimes,
	getAllTimePopularAnimes,
} from './getAnimes'

const initialState = {
	carousel: { loading: false, animes: [], hasData: false },
	trendingNow: { loading: false, animes: [], hasData: false },
	popularThisSeason: { loading: false, animes: [], hasData: false },
	nextSeason: { loading: false, animes: [], hasData: false },
	allTimePopular: { loading: false, animes: [], hasData: false },
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

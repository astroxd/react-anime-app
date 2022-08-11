import { TrendingNowProvider } from './TrendingNow'
import { PopularThisSeasonProvider } from './PopularThisSeason'
import { NextSeasonProvider } from './NextSeason'
import { AllTimePopularProvider } from './AllTimePopular'
import { combineComponents } from '../helpers/combineComponents'

const providers = [
	TrendingNowProvider,
	PopularThisSeasonProvider,
	NextSeasonProvider,
	AllTimePopularProvider,
]

export const AnimesContextProvider = combineComponents(...providers)

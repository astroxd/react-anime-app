import create from 'zustand'
import {
	getAnimeDetails,
	getAnimeRecommendations,
	getAnimeTags,
} from './getAnimeInfo'

const initialState = {
	id: '',
	details: null,
	tags: null,
	recommendations: null,
	loading: true,
}

const useAnimeDetailsStore = create((set, get) => ({
	...initialState,
	setId: async (id) => {
		set(() => ({ id: id, loading: true }))
		await get().getAnimeDetails()
		await get().getAnimeTags()
		await get().getAnimeRecommendations()
		set(() => ({ loading: false }))
	},
	getAnimeDetails: getAnimeDetails,
	getAnimeTags: getAnimeTags,
	getAnimeRecommendations: getAnimeRecommendations,
}))

export default useAnimeDetailsStore

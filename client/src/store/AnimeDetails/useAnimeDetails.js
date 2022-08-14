import shallow from 'zustand/shallow'
import useAnimeDetailsStore from './useAnimeDetailsStore'

const useAnimeDetails = () => {
	const { storedId, setId, details, tags, recommendations, loading } =
		useAnimeDetailsStore(
			(state) => ({
				storedId: state.id,
				setId: state.setId,
				details: state.details,
				tags: state.tags,
				recommendations: state.recommendations,
				loading: state.loading,
			}),
			shallow
		)

	return { storedId, setId, details, tags, recommendations, loading }
}

export default useAnimeDetails

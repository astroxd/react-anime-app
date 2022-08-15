import useUserListsStore from './useUserListsStore'

export const useUserLists = () => {
	const { lists, hasData, loading, getUserLists } = useUserListsStore(
		(state) => ({
			lists: state.lists,
			hasData: state.hasData,
			loading: state.loading,
			getUserLists: state.getUserLists,
		})
	)

	return { lists, hasData, loading, getUserLists }
}

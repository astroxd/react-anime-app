import useUserListsStore from './useUserListsStore'

export const useUserLists = () => {
	const { lists, getUserLists } = useUserListsStore((state) => ({
		lists: state.lists,
		getUserLists: state.getUserLists,
	}))

	return { lists, getUserLists }
}

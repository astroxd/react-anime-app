import { useContext, useEffect } from 'react'
import shallow from 'zustand/shallow'
import AuthContext from '../../context/AuthProvider'
import useUserListsStore from './useUserListsStore'

export const useUserLists = () => {
	const { loading: authLoading, auth } = useContext(AuthContext)

	const { lists, hasData, loading, getUserLists } = useUserListsStore(
		(state) => ({
			lists: state.lists,
			hasData: state.hasData,
			loading: state.loading,
			getUserLists: state.getUserLists,
		}),
		shallow
	)

	useEffect(() => {
		if (!hasData && !authLoading) getUserLists(auth)
	}, [authLoading, hasData])

	return { lists, hasData, loading, getUserLists }
}

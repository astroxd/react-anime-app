import create from 'zustand'
import { getUserLists } from './handleUserLists'

const useUserListsStore = create(() => ({
	lists: [],
	hasData: false,
	loading: false,
	getUserLists: getUserLists,

	//createNewList()
	//deleteList()
}))

export default useUserListsStore

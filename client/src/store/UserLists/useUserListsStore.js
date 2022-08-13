import create from 'zustand'
import { getUserLists } from './handleUserLists'

const useUserListsStore = create(() => ({
	lists: [],
	getUserLists: getUserLists,

	//createNewList()
	//deleteList()
}))

export default useUserListsStore

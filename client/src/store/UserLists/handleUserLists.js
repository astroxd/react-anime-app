import { authAxios } from '../../helpers/auth-axios'
import useUserListsStore from './useUserListsStore'

export const getUserLists = async (auth) => {
	useUserListsStore.setState({ loading: true })
	const response = await authAxios.get(`/lists/${auth.id}`)
	if (response.data)
		useUserListsStore.setState({
			lists: response.data,
			hasData: true,
			loading: false,
		})
}

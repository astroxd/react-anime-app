import getUser from '../../helpers/auth'

export const loginUser = (userInfo) => {
	return {
		type: 'LOGIN_USER',
		payload: userInfo,
	}
}

export const logoutUser = (userInfo) => {
	return {
		type: 'LOGOUT_USER',
		payload: userInfo,
	}
}

// eslint-disable-next-line no-unused-vars
export const reduxUser = async (dispatch, getState) => {
	const result = await getUser()

	// const stateBefore = getState()
	// console.log('Before', stateBefore)

	dispatch({ type: 'GET_USER', payload: result.data })

	// const stateAfter = getState()
	// console.log('After', stateAfter)
}

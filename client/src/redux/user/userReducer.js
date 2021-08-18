export const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				logged: true,
				user: action.payload,
			}
		case 'LOGOUT_USER':
			return action.payload

		case 'GET_USER':
			return action.payload
		default:
			return state
	}
}

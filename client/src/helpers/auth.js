import { authAxios } from './auth-axios'
const getUser = async () => {
	const user = await authAxios
		.get('/login')
		.catch((error) => console.log(error))
	if (user && user.data) {
		return user
	}
}

export default getUser

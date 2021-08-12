import axios from 'axios'
const getUser = async () => {
	axios.defaults.withCredentials = true

	const user = await axios
		.get('http://localhost:3001/api/login')
		.catch((error) => console.log(error))
	if (user && user.data) {
		return user
	}
}

export default getUser

import { createContext, useEffect, useState } from 'react'
import { authAxios } from '../helpers/auth-axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({})

	const getUser = async () => {
		try {
			const response = await authAxios.get('/login')
			if (response?.data?.message) {
				console.log(response?.data?.message)
			} else {
				console.log(response.data.user)
				setAuth(response.data.user)
			}
		} catch (error) {
			console.log('error in context:', error)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext

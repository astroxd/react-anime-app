import { createContext, useEffect, useState } from 'react'
import { authAxios } from '../helpers/auth-axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState()
	const [loading, setLoading] = useState(true)

	const getUser = async () => {
		setLoading(true)
		try {
			const response = await authAxios.get('/session')
			console.log(response)
			if (response.data?.user) {
				console.log(response.data?.user)
				setAuth(response.data?.user)
			}
			setLoading(false)
		} catch (error) {
			console.log('error in context:', error)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<AuthContext.Provider value={{ auth, setAuth, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext

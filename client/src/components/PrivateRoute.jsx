import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
const PrivateRoute = ({ children }) => {
	const location = useLocation()
	console.log(location)

	const { auth } = useContext(AuthContext)

	if (!auth.email) {
		return <Navigate to='/login' state={{ next: location.pathname }} replace />
	}

	return children
}

export default PrivateRoute

import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
const PrivateRoute = () => {
	const location = useLocation()
	const { auth, loading } = useContext(AuthContext)

	return loading ? (
		<></>
	) : auth?.email ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ next: location.pathname }} replace />
	)
}

export default PrivateRoute

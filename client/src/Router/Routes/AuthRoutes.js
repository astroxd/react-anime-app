import { lazy } from 'react'
import Loadable from '../../components/Loadable'

//* Routes
const Login = Loadable(lazy(() => import('../../pages/Login')))
const Register = Loadable(lazy(() => import('../../pages/Register')))

const AuthRoutes = [
	{ path: 'login', element: <Login /> },
	{ path: 'register', element: <Register /> },
]

export default AuthRoutes

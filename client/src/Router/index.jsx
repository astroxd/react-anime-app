import { useRoutes } from 'react-router-dom'

import PageRoutes from './Routes/PageRoutes'

const Router = () => {
	return useRoutes([PageRoutes])
}

export default Router

import { Suspense } from 'react'
import PageLoader from './PageLoader'

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => {
	return (
		<Suspense fallback={<PageLoader />}>
			<Component {...props} />
		</Suspense>
	)
}

export default Loadable

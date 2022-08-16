import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const BreadCrumbs = () => {
	const { pathname } = useLocation()

	const [paths, setPaths] = useState([])
	let previousPath = ''

	useEffect(() => {
		if (pathname === '/') {
			setPaths([''])
		} else {
			setPaths(pathname.split('/'))
		}
	}, [pathname])

	return (
		<Container fluid className='breadcrumb-container'>
			<Container>
				<Breadcrumb>
					{paths.map((path, idx) => {
						if (path !== '') {
							previousPath = previousPath.concat(`/${path}`)
						}
						if (path === '') {
							return (
								<Breadcrumb.Item
									key={idx}
									linkAs={Link}
									linkProps={{ to: previousPath }}
								>
									<FontAwesomeIcon icon={faHome} />
									Home
								</Breadcrumb.Item>
							)
						}
						if (idx === paths.length - 1) {
							return (
								<Breadcrumb.Item active key={idx}>
									{path}
								</Breadcrumb.Item>
							)
						}

						return (
							<Breadcrumb.Item
								key={idx}
								linkAs={Link}
								linkProps={{ to: previousPath }}
							>
								{path}
							</Breadcrumb.Item>
						)
					})}
				</Breadcrumb>
			</Container>
		</Container>
	)
}

export default BreadCrumbs

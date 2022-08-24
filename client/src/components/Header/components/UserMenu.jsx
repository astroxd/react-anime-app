import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../../context/AuthProvider'
import { authAxios } from '../../../helpers/auth-axios'

import { useClickOutside } from '../../../hooks/useClickOutside'
import { ErrorToast, SuccessToast } from '../../Toast'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const UserMenu = () => {
	const { auth, setAuth } = useContext(AuthContext)

	const [showMenu, setShowMenu] = useState(false)

	let domNode = useClickOutside(() => {
		setShowMenu(false)
	})

	const logOut = async () => {
		try {
			const response = await authAxios.post('/logout')

			if (response) {
				const { error } = response.data
				if (error) {
					ErrorToast(error)
				} else {
					const { message, user } = response.data
					setAuth(user)
					SuccessToast(message)
				}
			}
		} catch (error) {
			console.log('error', error)
			ErrorToast('An error has occured')
		}
	}
	return (
		<div className='profile' ref={domNode}>
			{auth?.email ? (
				<img
					src={auth.avatar}
					alt={`${auth.username} avatar`}
					className='avatar'
					onClick={() => {
						setShowMenu(!showMenu)
						console.log(auth)
					}}
					onError={(e) => {
						e.target.src = `https://avatars.dicebear.com/api/initials/${auth.username}.svg`
					}}
				/>
			) : (
				<FontAwesomeIcon
					icon={faUserCircle}
					className='avatar'
					onClick={() => setShowMenu(!showMenu)}
				/>
			)}
			<div className={`dropdown-menu profile-menu ${showMenu ? 'show' : ''}`}>
				{auth?.email ? (
					<ul>
						<li
							className='dropdown-menu-item profile-menu-user no-hover'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/profile'>
								Signed in as <b>{auth.username}</b>
							</Link>
						</li>
						<li
							className='dropdown-menu-item profile-menu-item divided'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/profile'>Your profile</Link>
						</li>
						<li
							className='dropdown-menu-item profile-menu-item'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/profile'>Your lists</Link>
						</li>
						<li
							className='dropdown-menu-item profile-menu-item'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/profile'>Your favorites</Link>
						</li>
						<li
							className='dropdown-menu-item profile-menu-item'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/settings'>Settings</Link>
						</li>
						<li
							className='dropdown-menu-item profile-menu-sign-out divided'
							onClick={() => {
								setShowMenu(!showMenu)
								logOut()
							}}
						>
							Log Out
						</li>
					</ul>
				) : (
					<ul>
						<li
							className='dropdown-menu-item profile-menu-item'
							onClick={() => setShowMenu(!showMenu)}
						>
							<Link to='/login'>Log In</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}
export default UserMenu

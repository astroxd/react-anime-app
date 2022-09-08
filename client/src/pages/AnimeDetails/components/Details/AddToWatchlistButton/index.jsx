import { useContext, useState } from 'react'

import { authAxios } from '../../../../../helpers/auth-axios'
import AuthContext from '../../../../../context/AuthProvider'

import { useClickOutside } from '../../../../../hooks/useClickOutside'

import { ErrorToast, SuccessToast } from '../../../../../components/Toast'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

//* Style
import './AddToWatchlistButton.css'

const AddToWatchlistButton = ({
	userLists,
	listsWithAnime,
	codeList,
	animeId,
	coverImage,
	title,
	refresh,
}) => {
	const [showWatchlistMenu, setShowWatchlistMenu] = useState(false)
	let domNode = useClickOutside(() => {
		setShowWatchlistMenu(false)
	})

	const { auth } = useContext(AuthContext)

	const addToList = async (listId) => {
		const response = await authAxios.post(`/listentrie/${listId}`, {
			user_id: auth.id,
			anime_id: animeId,
			anime_cover: coverImage.large,
			anime_title: title?.english ? title.english : title.romaji,
		})
		response.data?.message
			? SuccessToast(response.data.message)
			: ErrorToast(response.data.error)

		await refresh()
	}

	const removeFromList = async (listId) => {
		const response = await authAxios.delete(`/listentrie/${listId}/${animeId}`)

		response.data?.message
			? SuccessToast(response.data.message)
			: ErrorToast(response.data.error)

		await refresh()
	}

	const updateStatusList = async (listId) => {
		const response = await authAxios.patch(`/listentrie/${codeList.listId}`, {
			anime_id: animeId,
			new_list_id: listId,
		})

		response.data?.message
			? SuccessToast(response.data.message)
			: ErrorToast(response.data.error)

		await refresh()
	}

	const handleList = async (list, isInList) => {
		if (isInList) {
			removeFromList(list.listId)
		} else if (list?.code && codeList?.code) {
			updateStatusList(list.listId)
		} else {
			addToList(list.listId)
		}
	}

	return (
		<div className='add-to-watchlist' ref={domNode}>
			<button
				className={`primary-btn text ${codeList ? 'selected' : ''}`}
				onClick={() => setShowWatchlistMenu(!showWatchlistMenu)}
			>
				{codeList ? codeList.name : 'Add to watchlist'}
			</button>
			<button
				className={`primary-btn icon ${codeList ? 'selected' : ''}`}
				onClick={() => setShowWatchlistMenu(!showWatchlistMenu)}
			>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>
			<div className={`dropdown-menu ${showWatchlistMenu ? 'show' : ''}`}>
				<ul>
					<li className='dropdown-menu-item no-hover'>Set as:</li>
					{userLists.map((list, idx) => {
						const isInList = listsWithAnime.some(
							(listWithAnime) => listWithAnime.listId === list.listId
						)
						return (
							<li
								key={idx}
								className={`dropdown-menu-item ${isInList ? 'selected' : ''}`}
								onClick={() => handleList(list, isInList)}
							>
								{list.name}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default AddToWatchlistButton

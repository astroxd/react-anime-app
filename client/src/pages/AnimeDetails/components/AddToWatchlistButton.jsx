import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { authAxios } from '../../../helpers/auth-axios'
import AuthContext from '../../../context/AuthProvider'
const AddToWatchlistButton = ({
	userLists,
	listsWithAnime,
	codeList,
	anime_id,
	coverImage,
	title,
	refresh,
}) => {
	const [showWatchlistMenu, setShowWatchlistMenu] = useState(false)
	let domNode = useClickOutside(() => {
		setShowWatchlistMenu(false)
	})

	const { auth } = useContext(AuthContext)

	const addToList = async (list_id) => {
		const response = await authAxios.post(`/lists/list/${list_id}`, {
			user_id: auth.id,
			anime_id: anime_id,
			anime_cover: coverImage.large,
			anime_title: title.english ? title.english : title.romaji,
		})
		if (response.data) console.log(response.data)
		await refresh()
	}

	const removeFromList = async (list_id, reload = true) => {
		const response = await authAxios.delete(
			`/lists/list/${list_id}/${anime_id}`
		)
		if (response.data?.message) {
			console.log(response.data.message)
			if (reload) await refresh()
			return true
		}
		await refresh()
		return false
	}

	const addToStatusList = async (list_id) => {
		const isRemoved = await removeFromList(codeList.list_id, false)
		if (isRemoved) {
			addToList(list_id)
		}
	}

	const handleList = async (list, isInList) => {
		if (isInList) {
			removeFromList(list.list_id)
		} else if (list?.code && codeList?.code) {
			addToStatusList(list.list_id)
		} else {
			addToList(list.list_id)
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
							(listWithAnime) => listWithAnime.list_id === list.list_id
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

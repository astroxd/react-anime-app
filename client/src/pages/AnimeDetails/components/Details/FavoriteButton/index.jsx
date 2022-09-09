import { useContext, useEffect, useState } from 'react'

import AuthContext from '../../../../../context/AuthProvider'
import { authAxios } from '../../../../../helpers/auth-axios'

import { ErrorToast, SuccessToast } from '../../../../../components/Toast'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const FavoriteButton = ({ animeId, coverImage, title }) => {
	const { auth, loading } = useContext(AuthContext)

	const [isFavorite, setIsFavorite] = useState(false)
	const checkIfFavorite = async () => {
		const response = await authAxios.get(
			`/favorites/entrie/${auth.id}/${animeId}`
		)

		if (response.data) {
			setIsFavorite(response.data.isInFavorites)
		}
	}

	const handleFavorite = async () => {
		//* Remove from favorites
		if (isFavorite) {
			const response = await authAxios.delete(
				`/favorites/${auth.id}/${animeId}`
			)
			if (response.data) {
				SuccessToast(response.data.message)
				return await checkIfFavorite()
			}
			ErrorToast(response.data.error)
		}

		//* Add to favorites
		const response = await authAxios.post(`/favorites/${auth.id}`, {
			anime_id: animeId,
			anime_cover: coverImage.large,
			anime_title: title?.english ? title.english : title.romaji,
		})
		if (response.data) {
			SuccessToast(response.data.message)
			return await checkIfFavorite()
		}
		ErrorToast(response.data.error)
	}

	useEffect(() => {
		if (!loading && auth?.id) {
			checkIfFavorite()
		}
	}, [loading])

	return (
		<button className='primary-btn favorite' onClick={handleFavorite}>
			<FontAwesomeIcon icon={isFavorite ? fasHeart : faHeart} />
		</button>
	)
}

export default FavoriteButton

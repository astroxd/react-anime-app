import { createContext, useEffect, useState } from 'react'
import { gqlAxios } from '../helpers/gql-axios'

const CarouselContext = createContext([])

export const CarouselProvider = ({ children }) => {
	const [carouselAnimes, setCarouselAnimes] = useState()
	const [loading, setLoading] = useState(true)

	const query = {
		query: `
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (type: ANIME, sort: TRENDING_DESC){
						id
						title{
							english
							romaji
						}
						bannerImage
						genres
					}
				}
			}

		`,
		variables: { page: 1, perPage: 10 },
	}

	const getAnimes = async () => {
		setLoading(true)
		try {
			const response = await gqlAxios({ data: query })
			if (response.data?.data.Page) {
				console.log('carousel animes')
				const resultAnimes = response.data.data.Page.media
				const filteredAnimes = resultAnimes.filter(
					(anime) => anime?.bannerImage
				)
				setCarouselAnimes(filteredAnimes)
			}

			setLoading(false)
		} catch (error) {
			console.log('error in context:', error)
		}
	}

	useEffect(() => {
		getAnimes()
	}, [])

	return (
		<CarouselContext.Provider
			value={{ carouselAnimes, setCarouselAnimes, loading }}
		>
			{children}
		</CarouselContext.Provider>
	)
}

export default CarouselContext

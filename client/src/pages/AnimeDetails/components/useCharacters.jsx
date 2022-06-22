import { useEffect, useState } from 'react'
import { gqlAxios } from '../../../helpers/gql-axios'

export default function useCharacters(id, pageNumber) {
	const [loading, setLoading] = useState(true)
	// const [error, setError] = useStatee(false)
	const [characters, setCharacters] = useState([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setCharacters([])
	}, [])

	const getAnimeCharacters = async () => {
		setLoading(true)

		const query = {
			query: `
			query($id: Int, $pageNumber: Int){
				Media(id: $id){
					characters(sort: [FAVOURITES_DESC, RELEVANCE], page: $pageNumber) {
						pageInfo {
							hasNextPage
						}
						edges{
							node {
							  name {
								first
								middle
								last
							  }
							  image{
								large
								medium
							  }
							}
							role
							voiceActors(language:JAPANESE) {
							  name {
								full
							  }
							  image{
								large
								medium
							  }
							  languageV2
							}

						}
					}
				}
			}

		`,
			variables: { id, pageNumber },
		}

		const result = await gqlAxios({ data: query })
		if (result?.data?.data?.Media?.characters?.edges) {
			setCharacters([
				...characters,
				...result?.data?.data?.Media?.characters?.edges,
			])
			setHasMore(result?.data?.data?.Media?.characters?.pageInfo?.hasNextPage)
			setLoading(false)
		}
	}

	useEffect(() => {
		getAnimeCharacters()
	}, [pageNumber])

	return { loading, hasMore, characters }
}

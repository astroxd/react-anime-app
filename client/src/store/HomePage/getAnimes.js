import { getCurrentSeason, getNextSeason } from '../../helpers/animeSeasons'
import { gqlAxios } from '../../helpers/gql-axios'
import useHomePageStore from './useHomePageStore'

const getCarouselAnimes = async () => {
	useHomePageStore.setState((state) => ({
		carousel: { ...state.carousel, loading: true },
	}))
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

	try {
		const response = await gqlAxios({ data: query })
		if (response.data?.data.Page) {
			const resultAnimes = response.data.data.Page.media
			const filteredAnimes = resultAnimes.filter((anime) => anime?.bannerImage)
			useHomePageStore.setState({
				carousel: { animes: filteredAnimes, loading: false, hasData: true },
			})
		}
	} catch (error) {
		console.log('error in context:', error)
		useHomePageStore.setState({
			error: 'error in context',
		})
	}
}

const getTrendingNowAnimes = async () => {
	useHomePageStore.setState((state) => ({
		trendingNow: { ...state.trendingNow, loading: true },
	}))
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
                        episodes
                        nextAiringEpisode{
                            episode
                        }
                        popularity
                        coverImage{
                            large
                        }
                        genres
                        status
                    }
                }
            }

        `,
		variables: { page: 1, perPage: 9 },
	}
	try {
		const response = await gqlAxios({ data: query })
		if (response.data?.data.Page) {
			useHomePageStore.setState({
				trendingNow: {
					animes: response.data.data.Page.media,
					loading: false,
					hasData: true,
				},
			})
		}
	} catch (error) {
		console.log('error in context:', error)
		useHomePageStore.setState({
			error: 'error in context',
		})
	}
}

const getPopularThisSeasonAnimes = async () => {
	useHomePageStore.setState((state) => ({
		popularThisSeason: { ...state.popularThisSeason, loading: true },
	}))
	const query = {
		query: `
        query($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason){
            Page(page: $page, perPage: $perPage){
                media (seasonYear: $seasonYear, season: $season, type: ANIME, sort: POPULARITY_DESC){
                    id
                    title{
                        english
                        romaji
                    }
                    episodes
                    nextAiringEpisode{
                        episode
                    }
                    popularity
                    coverImage{
                        large
                    }
                    genres
                    status
                }
            }
        }

    `,
		variables: {
			page: 1,
			perPage: 9,
			seasonYear: new Date().getFullYear(),
			season: getCurrentSeason(),
		},
	}
	try {
		const response = await gqlAxios({ data: query })
		if (response.data?.data.Page) {
			useHomePageStore.setState({
				popularThisSeason: {
					animes: response.data.data.Page.media,
					loading: false,
					hasData: true,
				},
			})
		}
	} catch (error) {
		console.log('error in context:', error)
		useHomePageStore.setState({
			error: 'error in context',
		})
	}
}

const getNextSeasonAnimes = async () => {
	useHomePageStore.setState((state) => ({
		nextSeason: { ...state.nextSeason, loading: true },
	}))
	const query = {
		query: `
			query($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason){
				Page(page: $page, perPage: $perPage){
					media (seasonYear: $seasonYear, season: $season, type: ANIME, sort: POPULARITY_DESC){
						id
						title{
                            english
							romaji
						}
						episodes
						nextAiringEpisode{
							episode
						}
						popularity
						coverImage{
							extraLarge
						}
                        status
					}
				}
			}

		`,
		variables: {
			page: 1,
			perPage: 5,
			seasonYear: new Date().getFullYear(),
			season: getNextSeason(),
		},
	}
	try {
		const response = await gqlAxios({ data: query })
		if (response.data?.data.Page) {
			useHomePageStore.setState({
				nextSeason: {
					animes: response.data.data.Page.media,
					loading: false,
					hasData: true,
				},
			})
		}
	} catch (error) {
		console.log('error in context:', error)
		useHomePageStore.setState({
			error: 'error in context',
		})
	}
}

const getAllTimePopularAnimes = async () => {
	useHomePageStore.setState((state) => ({
		allTimePopular: { ...state.allTimePopular, loading: true },
	}))
	const query = {
		query: `
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (type: ANIME, sort: POPULARITY_DESC){
						id
						title{
                            english
							romaji
						}
						episodes
						nextAiringEpisode{
							episode
						}
						popularity
						bannerImage
						coverImage{
							extraLarge
						}
                        status
					}
				}
			}

		`,
		variables: {
			page: 1,
			perPage: 5,
		},
	}
	try {
		const response = await gqlAxios({ data: query })
		if (response.data?.data.Page) {
			useHomePageStore.setState({
				allTimePopular: {
					animes: response.data.data.Page.media,
					loading: false,
					hasData: true,
				},
			})
		}
	} catch (error) {
		console.log('error in context:', error)
		useHomePageStore.setState({
			error: 'error in context',
		})
	}
}

export {
	getCarouselAnimes,
	getTrendingNowAnimes,
	getPopularThisSeasonAnimes,
	getNextSeasonAnimes,
	getAllTimePopularAnimes,
}

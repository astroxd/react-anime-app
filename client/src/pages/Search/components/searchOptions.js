export const genreOptions = [
	{ name: 'Action', showName: 'Action' },
	{ name: 'Adventure', showName: 'Adventure' },
	{ name: 'Comedy', showName: 'Comedy' },
	{ name: 'Drama', showName: 'Drama' },
	{ name: 'Ecchi', showName: 'Ecchi' },
	{ name: 'Fantasy', showName: 'Fantasy' },
	{ name: 'Horror', showName: 'Horror' },
	{ name: 'Mahou Shoujo', showName: 'Mahou Shoujo' },
	{ name: 'Mecha', showName: 'Mecha' },
	{ name: 'Music', showName: 'Music' },
	{ name: 'Mystery', showName: 'Mystery' },
	{ name: 'Psychological', showName: 'Psychological' },
	{ name: 'Romance', showName: 'Romance' },
	{ name: 'Sci-Fi', showName: 'Sci-Fi' },
	{ name: 'Slice of Life', showName: 'Slice of Life' },
	{ name: 'Sports', showName: 'Sports' },
	{ name: 'Supernatural', showName: 'Supernatural' },
	{ name: 'Thriller', showName: 'Thriller' },
]

const generateYearOptions = () => {
	const date = new Date()

	const LAST_YEAR = date.getFullYear()
	const FIRST_YEAR = 1940

	return Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => ({
		name: (LAST_YEAR - i).toString(),
		showName: (LAST_YEAR - i).toString(),
	}))
}

export const yearOptions = generateYearOptions()

export const formatOptions = [
	{ name: 'TV', showName: 'TV' },
	{ name: 'TV_SHORT', showName: 'TV Short' },
	{ name: 'MOVIE', showName: 'Movie' },
	{ name: 'SPECIAL', showName: 'Special' },
	{ name: 'OVA', showName: 'OVA' },
	{ name: 'ONA', showName: 'ONA' },
	{ name: 'MUSIC', showName: 'Music' },
]

export const statusOptions = [
	{ name: 'RELEASING', showName: 'Airing' },
	{ name: 'NOT_YET_RELEASED', showName: 'Not Yet Aired' },
	{ name: 'FINISHED', showName: 'Finished' },
	{ name: 'CANCELLED', showName: 'Cancelled' },
]

export const sortOptions = [
	{ name: 'POPULARITY_DESC', showName: 'Popularity' },
	{ name: 'TITLE_ENGLISH', showName: 'Title' },
	{ name: 'SCORE_DESC', showName: 'Score' },
	{ name: 'TRENDING_DESC', showName: 'Trending' },
	{ name: 'ID_DESC', showName: 'Date' },
]

const toList = (string, typeList) => {
	let list = []

	if (string) {
		string.split(',').map((item) => {
			let object = typeList.find((listItem) => listItem.name === item)
			if (object === undefined) return
			list.push(object)
		})
	}
	return list
}

export const getGenres = (string) => {
	return toList(string, genreOptions)
}

export const getYear = (string) => {
	if (!string) return

	let year = string.split(',')[0] //* if &year=2020,2021 takes firs year (2020)
	return { name: year, showName: year }
}

export const getFormats = (string) => {
	return toList(string, formatOptions)
}

export const getStatus = (string) => {
	if (!string) return

	let status
	if (string) {
		const statusString = string.split(',')[0]
		let object = statusOptions.find(
			(listItem) => listItem.name === statusString
		)
		if (object) status = object
	}
	return status
}

import axios from 'axios'

export const gqlAxios = axios.create({
	baseURL: 'https://graphql.anilist.co',
	method: 'post',
})

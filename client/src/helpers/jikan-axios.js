import axios from 'axios'

export const jikanAxios = axios.create({
	baseURL: 'https://api.jikan.moe/v3',
})

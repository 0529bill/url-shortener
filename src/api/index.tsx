import { URLS } from '@/constants'
import axios from 'axios'
const API = axios.create({
	baseURL: URLS.BASE_URL,
	timeout: 20000,
})

API.interceptors.request.use((req) => {
	if (localStorage.getItem('userProfile')) {
		req.headers!.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile') || '').token}`
	}
	return req
})

// export const getUrlRespond = () => API.get('/urlRequest')
export const getUrlByUsername = (userInfo: string) => API.post('/users/getUrl', { userInfo })
export const sentUrlRequest = ({ urlRequest, username }: { urlRequest: string; username: string }) =>
	API.post('/urlRequest', { url: urlRequest, username })
export const createUser = (userInfo: { username: string; password: string }) =>
	API.post('/users/createUser', { userInfo })
export const userSignIn = (userInfo: { username: string; password: string }) =>
	API.post('/users/userSignIn', { userInfo })
export const forgetPasswordEmail = (userInfo: { email: string; origin: string }) =>
	API.post('/users/forgetPassword', userInfo)
export const resetPassword = (userInfo: { email: string; newPassword: string; pathParams: string }) =>
	API.post('users/resetPassword', { userInfo })

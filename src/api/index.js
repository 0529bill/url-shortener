import { URLS } from '@/constants';
import axios from 'axios';
const API = axios.create({
    baseURL: URLS.BASE_URL,
    timeout: 20000,
});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('userProfile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile') || '').token}`;
    }
    return req;
});
// export const getUrlRespond = () => API.get('/urlRequest')
export const getUrlByUsername = (userInfo) => API.post('/users/getUrl', { userInfo });
export const sentUrlRequest = ({ urlRequest, username }) => API.post('/urlRequest', { url: urlRequest, username });
export const createUser = (userInfo) => API.post('/users/createUser', { userInfo });
export const userSignIn = (userInfo) => API.post('/users/userSignIn', { userInfo });
export const forgetPasswordEmail = (userInfo) => API.post('/users/forgetPassword', userInfo);
export const resetPassword = (userInfo) => API.post('users/resetPassword', { userInfo });

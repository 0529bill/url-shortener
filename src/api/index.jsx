import axios from 'axios';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const API = axios.create({
  baseURL: VITE_BASE_URL,
});

export const getUrlRespond = () => API.get('/urlRequest');
export const sentUrlRequest = (urlRequest) =>
  API.post('/urlRequest', { url: urlRequest });

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://url-shortener-water.herokuapp.com/',
});

export const getUrlRespond = () => API.get('/urlRequest');
export const sentUrlRequest = (urlRequest) =>
  API.post('/urlRequest', { url: urlRequest });

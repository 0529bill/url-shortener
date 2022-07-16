import { URLS } from "@/constants";
import axios from "axios";
const API = axios.create({
  baseURL: URLS.BASE_URL,
  timeout: 20000,
});

export const getUrlRespond = () => API.get("/urlRequest");
export const sentUrlRequest = (urlRequest) =>
  API.post("/urlRequest", { url: urlRequest });
export const createUser = (userInfo) => API.post("/users", { userInfo });

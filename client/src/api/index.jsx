import { URLS } from "@/constants";
import axios from "axios";
const API = axios.create({
  baseURL: URLS.BASE_URL,
  timeout: 20000,
});

API.interceptors.request.use((req) => {
  console.log(
    'localStorage.getItem("userProfile")',
    localStorage.getItem("userProfile")
  );
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile")).token
    }`;
  }
  return req;
});

export const getUrlRespond = () => API.get("/urlRequest");
export const sentUrlRequest = (urlRequest) =>
  API.post("/urlRequest", { url: urlRequest });
export const createUser = (userInfo) =>
  API.post("/users/createUser", { userInfo });
export const userSignIn = (userInfo) =>
  API.post("/users/userSignIn", { userInfo });

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// const BASE_URL = document.location.origin || VITE_BASE_URL;

const BASE_URL = "http://localhost:4050/" || VITE_BASE_URL;

export default {
  BASE_URL,
};

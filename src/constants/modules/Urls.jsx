const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
const VITE_MODE = import.meta.env.MODE
console.log('VITE_MODE', VITE_MODE)

const BASE_URL = VITE_MODE === 'production' ? VITE_BASE_URL : ' http://localhost:4050/'

export default {
	BASE_URL,
}

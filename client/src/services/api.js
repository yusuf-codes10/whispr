import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ← this sends cookies automatically
  timeout: 10000, // increase or remove entirely
})

export default api

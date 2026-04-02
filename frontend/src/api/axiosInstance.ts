import axios from 'axios'
import {getUserId} from "../utils/user.ts"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const userId = getUserId()

    config.headers['x-user-id'] = userId

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

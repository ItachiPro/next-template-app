import { ApiErrorResponse } from '@/types/api'
import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    let message = 'Unexpected error'

    if (!error.response) {
      message = 'Server error'
    } else {
      const { status, data, statusText } = error.response

      if (status === 401 && typeof window !== 'undefined') {
        window.location.href = '/login'
      }

      if (status === 403) {
        message = 'Unauthorized'
      } else if (status >= 400 && status < 500) {
        message = data?.message || statusText
      } else {
        message = statusText
      }
    }

    console.log('ERROR: ', JSON.stringify(message, null, 2))

    return Promise.reject(error)
  },
)

export default instance

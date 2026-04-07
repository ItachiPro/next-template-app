import axios, { AxiosError } from 'axios'
import { ApiErrorResponse, ToastType } from '../types'
import { getToastMessage } from '../utils'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    let message = 'Unexpected error'

    if (!error.response) {
      message = 'Server error'
    } else {
      const { status, data, statusText } = error.response

      if (
        status === 401 &&
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login'
      ) {
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

    getToastMessage(message, ToastType.Error)

    return Promise.reject(error)
  },
)

export default instance

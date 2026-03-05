import { ApiErrorResponse } from '@/types/api'
import axios, { AxiosError, AxiosInstance } from 'axios'

class HttpClient {
  private static instance: AxiosInstance

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      HttpClient.instance.interceptors.request.use((config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token')

          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        return config
      })

      HttpClient.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiErrorResponse>) => {
          let message = ''

          if (!error.response) {
            message = 'No se pudó establecer conexión con el servidor.'
          } else {
            const status = error.response.status

            if (status === 500) {
              message = 'Error de servidor.'
            } else if (status === 401) {
              localStorage.removeItem('token')
              window.location.href = '/login'

              return Promise.reject(error)
            } else if (status >= 400 && status < 500) {
              message =
                error.response.data?.message || error.response.statusText
            } else {
              message = error.response.statusText
            }
          }

          return Promise.reject(error)
        },
      )
    }

    return HttpClient.instance
  }
}

export const http = HttpClient.getInstance()

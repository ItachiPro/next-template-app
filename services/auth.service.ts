import api from '@/lib/axios'
import { RegisterDTO } from '@/types'

export const AuthService = {
  async register(data: RegisterDTO) {
    const response = await api.post('/register', data)
    return response.data
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post('/login', data)
    return response.data
  },

  async logout() {
    const response = await api.post('/logout')
    return response.data
  },
}

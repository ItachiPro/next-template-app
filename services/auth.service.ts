import api from '@/lib/axios'
import { LoginDTO, RegisterDTO } from '@/types'

export const AuthService = {
  async register(data: RegisterDTO) {
    const response = await api.post('/register', data)
    return response
  },

  async login(data: LoginDTO) {
    const response = await api.post('/login', data)
    return response
  },

  async logout() {
    const response = await api.post('/logout')
    return response
  },

  async me() {
    const response = await api.get('/me')
    return response
  },
}

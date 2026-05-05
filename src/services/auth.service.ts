import api from '@/lib/axios'
import { AuthResponse, LoginDTO, RegisterDTO, UserInfoResponse } from '@/types'

export const AuthService = {
  async register(data: RegisterDTO) {
    const response = await api.post<AuthResponse>('/register', data)
    return response
  },

  async login(data: LoginDTO) {
    const response = await api.post<AuthResponse>('/login', data)
    return response
  },

  async logout() {
    const response = await api.post('/logout')
    return response
  },

  async me() {
    const response = await api.get<UserInfoResponse>('/me')
    return response
  },
}

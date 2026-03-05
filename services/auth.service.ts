import { http } from '@/lib/http'

type RegisterDTO = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const AuthService = {
  async register(data: RegisterDTO) {
    const response = await http.post('/register', data)
    return response.data
  },

  async login(data: { email: string; password: string }) {
    const response = await http.post('/login', data)
    return response.data
  },
}

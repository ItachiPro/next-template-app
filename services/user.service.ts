import api from '@/lib/axios'
import { UserDTO } from '@/types/types'

export const UserService = {
  async getUsers(params?: object) {
    const response = await api.get('/users', { params })
    return response
  },

  async getUser(id: string) {
    const response = await api.get(`/user/${id}`)
    return response
  },

  async saveUser(data: UserDTO) {
    const response = await api.post('/user', data)
    return response
  },

  async updateUser(id: string, data: UserDTO) {
    const response = await api.put(`/user/${id}`, data)
    return response
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/user/${id}`)
    return response
  },
}

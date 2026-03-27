import api from '@/lib/axios'

export const UserService = {
  async getUsers() {
    const response = await api.get('/users')
    return response
  },

  async getUser(id: string) {
    const response = await api.get(`/user/${id}`)
    return response
  },
}

import api from '@/lib/axios'
import {
  UserDTO,
  DeleteParams,
  GetByIdParams,
  GetParams,
  SaveParams,
  UpdateParams,
} from '@/types'

export const UserService = {
  async getUsers({ params, headers }: GetParams) {
    const response = await api.get('/users', { params, headers })
    return response
  },

  async getUser({ id, headers }: GetByIdParams) {
    const response = await api.get(`/user/${id}`, {
      headers,
    })
    return response
  },

  async saveUser({ data, headers }: SaveParams<UserDTO>) {
    const response = await api.post('/user', data, {
      headers,
    })
    return response
  },

  async updateUser({ id, data, headers }: UpdateParams<UserDTO>) {
    const response = await api.put(`/user/${id}`, data, { headers })
    return response
  },

  async deleteUser({ id, headers }: DeleteParams) {
    const response = await api.delete(`/user/${id}`, { headers })
    return response
  },
}

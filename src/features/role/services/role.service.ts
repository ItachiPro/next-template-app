import api from '@/lib/axios'
import {
  DeleteParams,
  GetByIdParams,
  GetParams,
  RoleDTO,
  SaveParams,
  UpdateParams,
} from '@/types'

export const RoleService = {
  async getRoles({ params, headers }: GetParams) {
    const response = await api.get('/roles', { params, headers })
    return response
  },

  async getRole({ id, headers }: GetByIdParams) {
    const response = await api.get(`/role/${id}`, {
      headers,
    })
    return response
  },

  async saveRole({ data, headers }: SaveParams<RoleDTO>) {
    const response = await api.post('/role', data, {
      headers,
    })
    return response
  },

  async updateRole({ id, data, headers }: UpdateParams<RoleDTO>) {
    const response = await api.put(`/role/${id}`, data, {
      headers,
    })
    return response
  },

  async deleteRole({ id, headers }: DeleteParams) {
    const response = await api.delete(`/role/${id}`, { headers })
    return response
  },
}

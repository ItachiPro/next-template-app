import api from '@/lib/axios'
import { PermissionDTO } from '@/types/types'

export const PermissionService = {
  async getPermissions(params?: object) {
    const response = await api.get('/permissions', { params })
    return response
  },

  async getPermission(id: string) {
    const response = await api.get(`/permission/${id}`)
    return response
  },

  async savePermission(data: PermissionDTO) {
    const response = await api.post('/permission', data)
    return response
  },

  async updatePermission(id: string, data: PermissionDTO) {
    const response = await api.put(`/permission/${id}`, data)
    return response
  },

  async deletePermission(id: string) {
    const response = await api.delete(`/permission/${id}`)
    return response
  },
}

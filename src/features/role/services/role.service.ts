import api from '@/lib/axios'
import {
  DeleteParams,
  GetByIdParams,
  GetParams,
  RoleDTO,
  RolePermissionDTO,
  RoleResponse,
  RolesPaginatedResponse,
  SaveParams,
  UpdateParams,
} from '@/types'

export const RoleService = {
  async getRoles({ params, headers }: GetParams) {
    const response = await api.get<RolesPaginatedResponse>('/roles', {
      params,
      headers,
    })
    return response
  },

  async getRole({ id, headers }: GetByIdParams) {
    const response = await api.get<RoleResponse>(`/role/${id}`, {
      headers,
    })
    return response
  },

  async saveRole({ data, headers }: SaveParams<RoleDTO>) {
    const response = await api.post<RoleResponse>('/role', data, {
      headers,
    })
    return response
  },

  async updateRole({ id, data, headers }: UpdateParams<RoleDTO>) {
    const response = await api.put<RoleResponse>(`/role/${id}`, data, {
      headers,
    })
    return response
  },

  async assignPermissions({
    id,
    data,
    headers,
  }: UpdateParams<RolePermissionDTO>) {
    const response = await api.put<RoleResponse>(
      `/role/${id}/permissions`,
      data,
      { headers },
    )
    return response
  },

  async deleteRole({ id, headers }: DeleteParams) {
    const response = await api.delete(`/role/${id}`, { headers })
    return response
  },
}

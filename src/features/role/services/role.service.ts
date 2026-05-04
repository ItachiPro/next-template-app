import api from '@/lib/axios'
import {
  ApiSuccessResponse,
  DeleteParams,
  GetByIdParams,
  GetParams,
  PaginatedResponse,
  RoleDTO,
  RolePermissionDTO,
  SaveParams,
  UpdateParams,
} from '@/types'
import { Role } from '../types'

export const RoleService = {
  async getRoles({ params, headers }: GetParams) {
    const response = await api.get<ApiSuccessResponse<PaginatedResponse<Role>>>(
      '/roles',
      { params, headers },
    )
    return response
  },

  async getRole({ id, headers }: GetByIdParams) {
    const response = await api.get<ApiSuccessResponse<Role>>(`/role/${id}`, {
      headers,
    })
    return response
  },

  async saveRole({ data, headers }: SaveParams<RoleDTO>) {
    const response = await api.post<ApiSuccessResponse<Role>>('/role', data, {
      headers,
    })
    return response
  },

  async updateRole({ id, data, headers }: UpdateParams<RoleDTO>) {
    const response = await api.put<ApiSuccessResponse<Role>>(
      `/role/${id}`,
      data,
      {
        headers,
      },
    )
    return response
  },

  async assignPermissions({
    id,
    data,
    headers,
  }: UpdateParams<RolePermissionDTO>) {
    const response = await api.put<ApiSuccessResponse<Role>>(
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

import api from '@/lib/axios'
import {
  PermissionDTO,
  DeleteParams,
  GetByIdParams,
  GetParams,
  SaveParams,
  UpdateParams,
  PermissionsPaginatedResponse,
  PermissionResponse,
} from '@/types'

export const PermissionService = {
  async getPermissions({ params, headers }: GetParams) {
    const response = await api.get<PermissionsPaginatedResponse>(
      '/permissions',
      { params, headers },
    )
    return response
  },

  async getPermission({ id, headers }: GetByIdParams) {
    const response = await api.get<PermissionResponse>(`/permission/${id}`, {
      headers,
    })
    return response
  },

  async savePermission({ data, headers }: SaveParams<PermissionDTO>) {
    const response = await api.post<PermissionResponse>('/permission', data, {
      headers,
    })
    return response
  },

  async updatePermission({ id, data, headers }: UpdateParams<PermissionDTO>) {
    const response = await api.put<PermissionResponse>(
      `/permission/${id}`,
      data,
      { headers },
    )
    return response
  },

  async deletePermission({ id, headers }: DeleteParams) {
    const response = await api.delete(`/permission/${id}`, { headers })
    return response
  },
}

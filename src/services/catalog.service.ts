import api from '@/lib/axios'
import { GetParams, PermissionsResponse, RolesResponse } from '@/types'

export const CatalogService = {
  async getRoles({ params, headers }: GetParams) {
    const response = await api.get<RolesResponse>('/roles', {
      params,
      headers,
    })
    return response
  },

  async getPermissions({ params, headers }: GetParams) {
    const response = await api.get<PermissionsResponse>('/permissions', {
      params,
      headers,
    })
    return response
  },
}

import api from '@/lib/axios'
import {
  UserDTO,
  DeleteParams,
  GetByIdParams,
  GetParams,
  SaveParams,
  UpdateParams,
  UserRoleDTO,
  UserPermissionDTO,
  UsersPaginatedResponse,
  UserResponse,
} from '@/types'

export const UserService = {
  async getUsers({ params, headers }: GetParams) {
    const response = await api.get<UsersPaginatedResponse>('/users', {
      params,
      headers,
    })
    return response
  },

  async getUser({ id, headers }: GetByIdParams) {
    const response = await api.get<UserResponse>(`/user/${id}`, {
      headers,
    })
    return response
  },

  async saveUser({ data, headers }: SaveParams<UserDTO>) {
    const response = await api.post<UserResponse>('/user', data, {
      headers,
    })
    return response
  },

  async updateUser({ id, data, headers }: UpdateParams<UserDTO>) {
    const response = await api.put<UserResponse>(`/user/${id}`, data, {
      headers,
    })
    return response
  },

  async assignRoles({ id, data, headers }: UpdateParams<UserRoleDTO>) {
    const response = await api.put<UserResponse>(`/user/${id}/roles`, data, {
      headers,
    })
    return response
  },

  async assignPermissions({
    id,
    data,
    headers,
  }: UpdateParams<UserPermissionDTO>) {
    const response = await api.put<UserResponse>(
      `/user/${id}/permissions`,
      data,
      { headers },
    )
    return response
  },

  async deleteUser({ id, headers }: DeleteParams) {
    const response = await api.delete(`/user/${id}`, { headers })
    return response
  },
}

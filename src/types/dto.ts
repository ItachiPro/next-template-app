import { Permission, Role, User } from '@/features'
import { ApiSuccessResponse, PaginatedResponse } from './api'

export type UserDTO = {
  name: string
  email: string
  password?: string | null
}

export type RoleDTO = {
  name: string
}

export type PermissionDTO = {
  name: string
}

export type UserResponse = ApiSuccessResponse<User>
export type UsersResponse = ApiSuccessResponse<User[]>
export type UsersPaginatedResponse = ApiSuccessResponse<PaginatedResponse<User>>

export type RoleResponse = ApiSuccessResponse<Role>
export type RolesResponse = ApiSuccessResponse<Role[]>
export type RolesPaginatedResponse = ApiSuccessResponse<PaginatedResponse<Role>>

export type PermissionResponse = ApiSuccessResponse<
  PaginatedResponse<Permission>
>

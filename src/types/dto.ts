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

export type UserResponse = ApiSuccessResponse<PaginatedResponse<User>>

export type RoleResponse = ApiSuccessResponse<Role[]>
export type RolePaginatedResponse = ApiSuccessResponse<PaginatedResponse<Role>>

export type PermissionResponse = ApiSuccessResponse<
  PaginatedResponse<Permission>
>

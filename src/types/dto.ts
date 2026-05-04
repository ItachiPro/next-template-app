import { Permission, Role, User } from '@/features'
import { ApiSuccessResponse, PaginatedResponse } from './api'

export type UserDTO = {
  name: string
  email: string
  password?: string | null
}

export type UserRoleDTO = {
  roles: number[]
}

export type UserPermissionDTO = {
  permissions: number[]
}

export type RoleDTO = {
  name: string
}

export type RolePermissionDTO = {
  permissions: number[]
}

export type PermissionDTO = {
  name: string
}

export type ApiResponse<T> = ApiSuccessResponse<T>

export type UserResponse = ApiSuccessResponse<User>
export type UsersResponse = ApiSuccessResponse<User[]>
export type UsersPaginatedResponse = ApiSuccessResponse<PaginatedResponse<User>>

export type RoleResponse = ApiSuccessResponse<Role>
export type RolesResponse = ApiSuccessResponse<Role[]>
export type RolesPaginatedResponse = ApiSuccessResponse<PaginatedResponse<Role>>

export type PermissionResponse = ApiSuccessResponse<Permission>
export type PermissionsResponse = ApiSuccessResponse<Permission[]>
export type PermissionsPaginatedResponse = ApiSuccessResponse<
  PaginatedResponse<Permission>
>

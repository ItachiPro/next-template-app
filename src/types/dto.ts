import { Permission, User } from '@/features'
import { ApiSuccessResponse, PaginatedResponse } from './api'

export type UserDTO = {
  name: string
  email: string
  password?: string | null
}

export type PermissionDTO = {
  name: string
}

export type UserResponse = ApiSuccessResponse<PaginatedResponse<User>>

export type PermissionResponse = ApiSuccessResponse<
  PaginatedResponse<Permission>
>

import { ApiSuccessResponse, PaginatedResponse } from './api'
import { Permission, User } from './user'

export type UserDTO = {
  name: string
  email: string
  password: string
}

export type PermissionDTO = {
  name: string
}

export type UserResponse = ApiSuccessResponse<PaginatedResponse<User>>

export type PermissionResponse = ApiSuccessResponse<
  PaginatedResponse<Permission>
>

import { Permission } from '@/features/permission'
import { Role } from '@/features/role'

export type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  roles?: Role[]
  permissions?: Permission[]
}

export type UserData = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  roles?: number
  permission?: number
}

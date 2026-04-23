import { Permission } from '@/features/permission'

export type Role = {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  permissions?: Permission[]
}

export type RoleData = {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  permissions?: number
}

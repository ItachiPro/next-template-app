export type User = {
  id: number
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

export type Permission = {
  id: number
  name: string
}

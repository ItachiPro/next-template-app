import { User } from './user'

export type RegisterDTO = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginResponse = {
  user: User
  token: string
}

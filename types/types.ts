import { User } from './user'

export type UserDTO = {
  name: string
  email: string
  password: string
}

export type UserResponse = {
  user: User
}

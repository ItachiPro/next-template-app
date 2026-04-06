import { User } from './user'

export type RegisterDTO = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type RegisterResponse = {
  user: User
}

export type LoginDTO = {
  email: string
  password: string
}

export type LoginResponse = {
  user: User
  token: string
}

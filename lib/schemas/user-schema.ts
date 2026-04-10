import z from 'zod'

export const getUserSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(5, 'Name must be at least 5 characters.'),
    email: z.email('Please enter a valid email.'),
    password: isEdit
      ? z.string().optional().or(z.literal(''))
      : z.string().min(8, 'Password must be at least 8 characters.'),
  })

export type UserInput = z.infer<ReturnType<typeof getUserSchema>>

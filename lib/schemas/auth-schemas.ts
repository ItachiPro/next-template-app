import z from 'zod'

export const loginSchema = z.object({
  email: z.email('Please enter a valid email.'),
  password: z.string().min(8, 'Password mus be at least 8 characters.'),
  remember: z.coerce.boolean().optional().default(true),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.email('Please enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    passwordConfirmation: z.string().min(8, 'Please confirm your password.'),
  })
  .refine((v) => v.password === v.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

import z from 'zod'

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8, 'Password mus be at least 8 characters.'),
  remember: z.coerce.boolean().optional().default(true),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Please confirm your password.'),
    acceptTerms: z.coerce
      .boolean()
      .refine(Boolean, 'You must accept the terms.'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

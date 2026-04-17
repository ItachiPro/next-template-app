import z from 'zod'

export const getUserSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(5, 'Name must be at least 5 characters.'),
    email: z.email('Please enter a valid email.'),
    password: isEdit
      ? z.string().optional().or(z.literal(''))
      : z.string().min(8, 'Password must be at least 8 characters.'),
  })

export const assignRoleSchema = z.object({
  roles: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .min(1, 'At least one role is required.'),
})

export const assignPermissionSchema = z.object({
  permissions: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .min(1, 'At least one permission is required.'),
})

export type UserInput = z.infer<ReturnType<typeof getUserSchema>>
export type AssignRoleInput = z.infer<typeof assignRoleSchema>
export type AssignPermissionInput = z.infer<typeof assignPermissionSchema>

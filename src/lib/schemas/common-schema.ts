import z from 'zod'

export const assignPermissionSchema = z.object({
  permissions: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
})

export type AssignPermissionInput = z.infer<typeof assignPermissionSchema>

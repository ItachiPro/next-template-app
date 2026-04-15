'use client'

import { useEffect } from 'react'
import { Role } from '@/features/role'
import { User } from '../types'
import { DualListField } from '@/components'
import { useForm } from '@/hooks'
import { assignRoleSchema } from '@/lib/schemas'

type Props = {
  user: User | null
  onSuccess: () => void
  assignedRoles: string[]
  roles: Role[]
}

export const AssignRoleForm = ({
  user,
  onSuccess,
  assignedRoles,
  roles,
}: Props) => {
  const { form, setField, handleSubmit, getError } = useForm({
    initialValues: {
      roles: roles.filter((r) => assignedRoles.includes(r.name)),
    },
    schema: assignRoleSchema,
    onSubmit: async (values) => {
      console.log('ROLES: ', JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {
    const assignedSet = new Set(assignedRoles)

    const mappedRoles = roles.filter((r) => assignedSet.has(r.name))

    setField('roles', mappedRoles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, assignedRoles])

  return (
    <div>
      <DualListField
        items={roles}
        value={form.roles}
        onChange={(roles) => setField('roles', roles)}
        getId={(role) => role.id}
        getLabel={(role) => role.name}
        leftTitle="Available roles"
        rightTitle="Assigned roles"
      />

      <div className="flex justify-end gap-2 px-2">
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
          Cancel
        </button>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  )
}

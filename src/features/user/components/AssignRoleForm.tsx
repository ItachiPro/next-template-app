'use client'

import { useEffect } from 'react'
import { Role } from '@/features/role'
import { User } from '../types'
import { DualListField } from '@/components'
import { useForm } from '@/hooks'
import { assignRoleSchema } from '@/lib/schemas'
import { UserService } from '../services'
import { ApiError, ToastType } from '@/types'
import { getToastMessage, mapErrors } from '@/utils'

type Props = {
  user: User | null
  assignedRoles: string[]
  roles: Role[]
  onSuccess: () => void
  onClose: () => void
}

export const AssignRoleForm = ({
  user,
  assignedRoles,
  roles,
  onSuccess,
  onClose,
}: Props) => {
  const { form, setField, handleSubmit, getError, hasError, setBackendErrors } =
    useForm({
      initialValues: {
        roles: roles.filter((r) => assignedRoles.includes(r.name)),
      },
      schema: assignRoleSchema,
      onSubmit: async (values) => {
        if (!user) {
          return
        }

        try {
          const roles = values.roles.map((role) => role.id)

          const res = await UserService.assignRoles({
            id: user.id,
            data: {
              roles: roles,
            },
          })

          if (res.status === 200) {
            const data = res.data
            getToastMessage(data.message, ToastType.Success)
            onSuccess()
          }
        } catch (error: unknown) {
          const err = error as ApiError

          if (typeof err.errors === 'object') {
            setBackendErrors(err.errors)
          }

          mapErrors(err)
        }
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
        hasError={hasError('roles')}
      />

      {getError('roles') && (
        <p className="text-xs text-red-500 flex justify-end mt-1">
          {getError('roles')}
        </p>
      )}

      <div className="flex justify-end gap-2 px-2">
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={onClose}
        >
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

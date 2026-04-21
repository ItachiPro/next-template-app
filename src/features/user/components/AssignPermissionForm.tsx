'use client'

import { useEffect } from 'react'
import { Permission } from '@/features/permission'
import { User } from '../types'
import { useForm } from '@/hooks'
import { assignPermissionSchema } from '@/lib/schemas'
import { ApiError, ToastType, UserResponse } from '@/types'
import { getToastMessage, mapErrors } from '@/utils'
import { UserService } from '../services'
import { DualListField } from '@/components'

type Props = {
  user: User | null
  assignedPermissions: string[]
  permissions: Permission[]
  onSuccess: () => void
  onClose: () => void
}

export const AssignPermissionForm = ({
  user,
  assignedPermissions,
  permissions,
  onSuccess,
  onClose,
}: Props) => {
  const { form, setField, handleSubmit, getError, hasError, setBackendErrors } =
    useForm({
      initialValues: {
        permissions: permissions.filter((p) =>
          assignedPermissions.includes(p.name),
        ),
      },
      schema: assignPermissionSchema,
      onSubmit: async (values) => {
        if (!user) {
          return
        }

        try {
          const permissions = values.permissions.map(
            (permission) => permission.id,
          )

          const res = await UserService.assignPermissions({
            id: user.id,
            data: {
              permissions: permissions,
            },
          })

          if (res.status === 200) {
            const data: UserResponse = res.data
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
    const assignedSet = new Set(assignedPermissions)

    const mappedPermissions = permissions.filter((p) => assignedSet.has(p.name))

    setField('permissions', mappedPermissions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions, assignedPermissions])

  return (
    <div>
      <DualListField
        items={permissions}
        value={form.permissions}
        onChange={(permissions) => setField('permissions', permissions)}
        getId={(permission) => permission.id}
        getLabel={(permission) => permission.name}
        leftTitle="Available permissions"
        rightTitle="Assigned permissions"
        hasError={hasError('permissions')}
      />

      {getError('permissions') && (
        <p className="text-xs text-red-500 flex justify-end mt-1">
          {getError('permissions')}
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

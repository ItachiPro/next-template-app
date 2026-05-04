'use client'

import { useEffect } from 'react'
import { Permission } from '@/features/permission'
import { useForm } from '@/hooks'
import { assignPermissionSchema } from '@/lib/schemas'
import { ApiError, ApiSuccessResponse, ToastType } from '@/types'
import { getToastMessage, mapErrors } from '@/utils'
import { DualListField } from '@/components'
import { AxiosResponse } from 'axios'

type AssignService<TModule> = (
  id: number,
  permissions: number[],
) => Promise<AxiosResponse<ApiSuccessResponse<TModule>>>

type Props<TService> = {
  id: number | null
  allPermissions: Permission[]
  assignedPermissions: string[]
  disabledPermissionIds?: number[]
  onSuccess: () => void
  onClose: () => void
  assignService: AssignService<TService>
}

export const AssignPermissionForm = <TService,>({
  id,
  allPermissions,
  assignedPermissions,
  disabledPermissionIds = [],
  onSuccess,
  onClose,
  assignService,
}: Props<TService>) => {
  const { form, setField, handleSubmit, getError, hasError, setBackendErrors } =
    useForm({
      initialValues: {
        permissions: allPermissions.filter((p) =>
          assignedPermissions.includes(p.name),
        ),
      },
      schema: assignPermissionSchema,
      onSubmit: async (values) => {
        if (!id) {
          return
        }

        try {
          const permissions = values.permissions.map(
            (permission) => permission.id,
          )

          const res = await assignService(id, permissions)

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
    const assignedSet = new Set(assignedPermissions)

    const mapped = allPermissions.filter((p) => assignedSet.has(p.name))

    setField('permissions', mapped)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPermissions, assignedPermissions])

  return (
    <div>
      <DualListField
        items={allPermissions}
        value={form.permissions}
        onChange={(permissions) => setField('permissions', permissions)}
        getId={(permission) => permission.id}
        getLabel={(permission) => permission.name}
        leftTitle="Available permissions"
        rightTitle="Assigned permissions"
        disabledItems={disabledPermissionIds}
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

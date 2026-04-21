'use client'

import {
  ApiError,
  FormAction,
  PermissionsPaginatedResponse,
  ToastType,
} from '@/types'
import { Permission } from '../types'
import { useForm } from '@/hooks'
import { permissionSchema } from '@/lib/schemas'
import { PermissionService } from '../services'
import { getToastMessage, mapErrors } from '@/utils'

type Props = {
  mode: FormAction
  permission?: Permission | null
  onSuccess: () => void
}

export const PermissionForm = ({ mode, permission, onSuccess }: Props) => {
  const {
    pending,
    getInputProps,
    getError,
    hasError,
    setBackendErrors,
    handleSubmit,
  } = useForm({
    initialValues: {
      name: permission?.name || '',
    },
    schema: permissionSchema,
    onSubmit: async (values) => {
      const isEdit = mode === FormAction.Edit

      const id = isEdit && permission ? permission.id : 0

      const payload = {
        ...values,
      }

      try {
        const res = isEdit
          ? await PermissionService.updatePermission({ id, data: payload })
          : await PermissionService.savePermission({ data: payload })

        if (res.status === 201 || res.status === 200) {
          const data: PermissionsPaginatedResponse = res.data
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

  return (
    <form className="flex flex-col gap-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-500 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          {...getInputProps('name')}
          className={`w-full rounded-lg px-3 py-2 text-gray-500 border ${
            hasError('name') ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {getError('name') && (
          <p className="text-xs text-rose-300">{getError('name')}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {pending ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          'Save'
        )}
      </button>
    </form>
  )
}

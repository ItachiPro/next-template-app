'use client'

import {
  ApiError,
  FormAction,
  RolesPaginatedResponse,
  ToastType,
} from '@/types'
import { RoleData } from '../types'
import { useForm } from '@/hooks'
import { roleSchema } from '@/lib/schemas'
import { RoleService } from '../services'
import { getToastMessage, mapErrors } from '@/utils'

type Props = {
  mode: FormAction
  role?: RoleData | null
  onSuccess: () => void
}

export const RoleForm = ({ mode, role, onSuccess }: Props) => {
  const {
    pending,
    getInputProps,
    getError,
    hasError,
    setBackendErrors,
    handleSubmit,
  } = useForm({
    initialValues: {
      name: role?.name || '',
    },
    schema: roleSchema,
    onSubmit: async (values) => {
      const isEdit = mode === FormAction.Edit

      const id = isEdit && role ? role.id : 0

      const payload = {
        ...values,
      }

      try {
        const res = isEdit
          ? await RoleService.updateRole({ id, data: payload })
          : await RoleService.saveRole({ data: payload })

        if (res.status === 201 || res.status === 200) {
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

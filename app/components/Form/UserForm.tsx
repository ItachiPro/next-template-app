'use client'

import { useState } from 'react'
import { useForm } from '@/app/hooks'
import { getUserSchema } from '@/app/lib/schemas'
import { FormAction, ToastType, User } from '@/app/types'
import { Eye, EyeOff } from 'lucide-react'
import { UserService } from '@/app/services/user.service'
import { UserResponse } from '@/app/types/types'
import { getToastMessage } from '@/app/utils'

type Props = {
  mode: FormAction
  user?: User | null
  onSuccess: () => void
}

export const UserForm = ({ mode, user, onSuccess }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { pending, getInputProps, getError, hasError, handleSubmit } = useForm({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    },
    schema: getUserSchema(mode === FormAction.Edit),
    onSubmit: async (values) => {
      const isEdit = mode === FormAction.Edit

      const id = isEdit && user ? user.id : 0

      const payload = isEdit
        ? {
            ...values,
            ...(values.password ? { password: values.password } : {}),
          }
        : values

      try {
        const res = isEdit
          ? await UserService.updateUser({ id, data: payload })
          : await UserService.saveUser({ data: payload })

        if (res.status === 201 || res.status === 200) {
          const data: UserResponse = res.data
          getToastMessage(data.message, ToastType.Success)
          onSuccess()
        }
      } catch (error: unknown) {
        getToastMessage(String(error), ToastType.Error)
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

      <div className="space-y-2">
        <label className="text-sm text-gray-500 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="email@correo.com"
          {...getInputProps('email')}
          className={`w-full rounded-lg px-3 py-2 text-gray-500 border ${
            hasError('email') ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {getError('email') && (
          <p className="text-xs text-rose-300">{getError('email')}</p>
        )}
      </div>

      {mode === 'create' && (
        <div className="space-y-2">
          <label
            className="text-sm text-gray-500 font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              {...getInputProps('password')}
              className={`w-full rounded-lg px-3 py-2 text-gray-500 border ${
                hasError('password') ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-2 my-auto rounded-xl px-3 text-xs text-zinc-300 hover:bg-white/5"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {getError('password') && (
            <p className="text-xs text-rose-300">{getError('password')}</p>
          )}
        </div>
      )}

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

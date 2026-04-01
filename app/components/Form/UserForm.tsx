'use client'

import { useState } from 'react'
import { useForm } from '@/app/hooks'
import { userSchema } from '@/lib/schemas'
import { User } from '@/types'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  mode: 'create' | 'edit'
  user?: User
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
    schema: userSchema,
    onSubmit: async () => {},
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
          className="text-gray-500 w-full border rounded-lg px-3 py-2"
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
          className="text-gray-500 w-full border rounded-lg px-3 py-2"
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
              className="text-gray-500 w-full border rounded-lg px-3 py-2"
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
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        {pending
          ? mode === 'create'
            ? 'Saving...'
            : 'Updating...'
          : mode === 'create'
            ? 'Save'
            : 'Update'}
      </button>
    </form>
  )
}

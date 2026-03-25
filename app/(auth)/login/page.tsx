'use client'

import { useState } from 'react'
import { AuthService } from '@/services/auth.service'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context'
import { useForm } from '@/app/hooks'
import { loginSchema } from '@/lib/schemas'

const cn = (...classes: Array<string | false | undefined | null>) => {
  return classes.filter(Boolean).join(' ')
}

const LoginPage = () => {
  const { login } = useAuth()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    pending,
    getInputProps,
    getCheckboxProps,
    getError,
    hasError,
    handleSubmit,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    schema: loginSchema,
    onSubmit: async (values) => {
      const res = await AuthService.login(values)

      if (res.status === 200) {
        login(res.data.data.token)
        router.push('dashboard')
      }
    },
  })

  return (
    <div className="rounded-3xl bg-zinc-900/40 p-6 ring-1 ring-white/10 backdrop-blur">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="text-sm text-zinc-400">
          Access with your email and password.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="stan@email.com"
            {...getInputProps('email')}
            className={cn(
              'w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm outline-none ring-1 transition',
              'ring-white/10 focus:ring-white/20',
              hasError('email') && 'ring-rose-500/40 focus:ring-rose-500/50',
            )}
          />
          {getError('email') && (
            <p className="text-xs text-rose-300">{getError('email')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="********"
              {...getInputProps('password')}
              className={cn(
                'w-full rounded-2xl bg-zinc-950/40 px-4 py-3 pr-12 text-sm outline-none ring-1 transition',
                'ring-white/10 focus:ring-white/20',
                hasError('password') &&
                  'ring-rose-500/40 focus:ring-rose-500/50',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-2 my-auto rounded-xl px-3 text-xs text-zinc-300 hover:bg-white/5"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {getError('password') && (
            <p className="text-xs text-rose-300">{getError('password')}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              {...getCheckboxProps('remember')}
              className="h-4 w-4 rounded border-white/20 bg-zinc-950/40"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={cn(
            'mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium transition',
            'bg-white text-zinc-950 hover:bg-zinc-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {pending ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="pt-2 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-zinc-200 hover:text-white">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage

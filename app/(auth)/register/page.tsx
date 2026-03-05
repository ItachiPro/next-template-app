'use client'

import { useMemo, useState } from 'react'
import { AuthService } from '@/services/auth.service'
import Link from 'next/link'

const cn = (...classes: Array<string | false | undefined | null>) => {
  return classes.filter(Boolean).join(' ')
}

const RegisterPage = () => {
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const emailError = useMemo(() => {
    if (!form.email) return ''
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    return ok ? '' : 'Please enter a valid email.'
  }, [form.email])

  const passwordError = useMemo(() => {
    if (!form.password) return ''
    return form.password.length >= 8
      ? ''
      : 'Password must be at least 8 characters.'
  }, [form.password])

  const confirmError = useMemo(() => {
    if (!form.confirmPassword) return ''
    return form.confirmPassword === form.password
      ? ''
      : 'Password do not match.'
  }, [form.confirmPassword, form.password])

  const canSubmit =
    form.name.trim() &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmError &&
    !pending

  const onSubmit = async () => {
    try {
      const data = await AuthService.register(form)

      localStorage.setItem('token', data.token)
      console.log('Registered: ', data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="rounded-3xl bg-zinc-900/40 p-6 ring-1 ring-white/10 backdrop-blur">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p className="text-sm text-zinc-400">
          Sign up and get started in minutes.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Stan"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition focus:ring-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="stan@correo.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className={cn(
              'w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm outline-none ring-1 transition',
              'ring-white/10 focus:ring-white/20',
              emailError && 'ring-rose-500/40 focus:ring-rose-500/50',
            )}
          />
          {emailError && <p className="text-xs text-rose-300">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              className={cn(
                'w-full rounded-2xl bg-zinc-950/40 px-4 py-3 pr-12 text-sm outline-none ring-1 transition',
                'ring-white/10 focus:ring-white/20',
                passwordError && 'ring-rose-500/40 focus:ring-rose-500/50',
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
          {passwordError && (
            <p className="text-xs text-rose-300">{passwordError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-200" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            className={cn(
              'w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm outline-none ring-1 transition',
              'ring-white/10 focus:ring-white/20',
              confirmError && 'ring-rose-500/40 focus:ring-rose-500/50',
            )}
          />
          {confirmError && (
            <p className="text-xs text-rose-300">{confirmError}</p>
          )}
        </div>

        <button
          disabled={!canSubmit}
          className={cn(
            'mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium transition',
            'bg-white text-zinc-950 hover:bg-zinc-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {pending ? 'Creating...' : 'Create account'}
        </button>

        <p className="pt-2 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-zinc-200 hover:text-white">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage

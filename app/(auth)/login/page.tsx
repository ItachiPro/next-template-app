'use client'

import { useMemo, useState } from 'react'
import { AuthService } from '@/services/auth.service'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const cn = (...classes: Array<string | false | undefined | null>) => {
  return classes.filter(Boolean).join(' ')
}

const LoginPage = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: true,
  })

  const emailError = useMemo(() => {
    if (!form.email) return ''
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    return ok ? '' : 'Please enter a valid email.'
  }, [form.email])

  const passwordError = useMemo(() => {
    if (!form.password) return ''
    return form.password.length >= 8 ? '' : 'Minimum 8 characters.'
  }, [form.password])

  const canSubmit = Boolean(
    form.email && form.password && !emailError && !passwordError && !pending,
  )

  const onSubmit = async () => {
    if (pending) return

    try {
      setPending(true)
      await AuthService.login(form)

      router.replace('/dashboard')
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setPending(false)
    }
  }

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
              autoComplete="current-password"
              placeholder="********"
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

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) =>
                setForm((p) => ({ ...p, remember: e.target.checked }))
              }
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
          onClick={onSubmit}
          disabled={!canSubmit}
          className={cn(
            'mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium transition',
            'bg-white text-zinc-950 hover:bg-zinc-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {pending ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="relative py-2">
          <div className="h-px w-full bg-white/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-3 text-xs text-zinc-400">
            o
          </span>
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-white/5"
          onClick={() => alert('OAuth demo')}
        >
          Continue with Google
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

'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'

type Props = {
  children: ReactNode
  permission?: string
  role?: string
  redirectTo?: string
}

export const Protected = ({
  children,
  permission,
  role,
  redirectTo = '/',
}: Props) => {
  const { can, hasRole, user } = useAuth()
  const router = useRouter()

  const isAllowed = () => {
    if (!user) return false

    if (permission) return can(permission)
    if (role) return hasRole(role)

    return true
  }

  useEffect(() => {
    if (!isAllowed()) {
      router.replace(redirectTo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!isAllowed()) return null

  return <>{children}</>
}

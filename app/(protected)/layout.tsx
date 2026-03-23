'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuth } from '../context'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return <>{children}</>
}

export default ProtectedLayout

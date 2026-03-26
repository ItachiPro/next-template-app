'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuthContext } from '../context'
import { Navbar } from '../components'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default ProtectedLayout

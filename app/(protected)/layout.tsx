'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useAuthContext } from '../context'
import { Navbar, SideBar } from '../components'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext()

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <div className="flex">
      <SideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}
      >
        <Navbar setMobileOpen={setMobileOpen} />

        <main className="p-6 bg-slate-100 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout

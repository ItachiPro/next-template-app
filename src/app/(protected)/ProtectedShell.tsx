'use client'

import { useState } from 'react'
import { Navbar, SideBar } from '@/components'

const ProtectedShell = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

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

export default ProtectedShell

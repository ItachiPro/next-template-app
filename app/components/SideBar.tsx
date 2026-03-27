'use client'

import { usePathname } from 'next/navigation'
import { routes } from '../config'
import { useAuth } from '../hooks'
import Link from 'next/link'
import { Menu } from 'lucide-react'

type Props = {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (value: boolean) => void
}

export const SideBar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: Props) => {
  const pathname = usePathname()

  const { can } = useAuth()

  const visibleRoutes = routes.filter((route) => {
    if (!route.permission) return true

    return can(route.permission)
  })

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
            fixed top-0 left-0 h-screen bg-slate-900 text-white z-50 transition-all duration-300 
            ${collapsed ? 'w-20' : 'w-64'} 
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b- border-slate-800">
          {!collapsed && <span className="font-bold">Next admin template</span>}

          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {visibleRoutes.map((route) => {
            const active = pathname === route.path
            const Icon = route.icon

            return (
              <Link
                className={`px-4 py-2 rounded-lg text-sm transition flex space-between gap-5 ${active ? 'bg-indigo-600' : 'hover:bg-slate-800 text-slate-300'}`}
                key={route.path}
                href={route.path}
              >
                <Icon size={18} />
                {!collapsed && <span>{route.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

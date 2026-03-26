'use client'

import { useAuthContext } from '@/app/context'
import { AuthService } from '@/services/auth.service'
import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const { logout } = useAuthContext()

  const onLogout = async () => {
    const response = await AuthService.logout()

    if (response.status === 200) {
      logout()
      redirect('/login')
    }
  }

  return (
    <div className="mt-2">
      <h1>Dashboard</h1>

      <button
        className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium transition"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardPage

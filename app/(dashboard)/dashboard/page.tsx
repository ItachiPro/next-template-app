'use client'

import { AuthService } from '@/services/auth.service'

const DashboardPage = () => {
  const logout = async () => {
    const response = await AuthService.logout()

    if (response.status === 200) {
      localStorage.removeItem('token')
    }
  }

  return (
    <div className="">
      <h1>Dashboard</h1>

      <button
        className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-medium transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardPage

import { useAuthContext } from '../context'
import { AuthService } from '@/services/auth.service'
import { Menu, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  setMobileOpen: (value: boolean) => void
}

export const Navbar = ({ setMobileOpen }: Props) => {
  const { logout } = useAuthContext()

  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const onLogout = async () => {
    const response = await AuthService.logout()

    if (response.status === 200) {
      logout()
      router.push('/login')
    }
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 relative">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-3 hover:bg-slate-10 px-3 py-1.5 rounded-lg transition"
          onClick={() => setOpen(!open)}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <UserRound size={16} />
          </div>

          <span className="text-sm font-medium text-slate-700 hidden sm:block">
            Stan
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border overflow-hidden">
            <div className="px-4 py-2 text-sm text-slate-500 border-b">
              Signed in as <br />
              <span className="font-medium text-slate-800">Stan</span>
            </div>

            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

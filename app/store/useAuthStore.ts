import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: number
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

type AuthState = {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

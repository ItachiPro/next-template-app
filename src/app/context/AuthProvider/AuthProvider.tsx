'use client'

import { AuthService } from '@/services/auth.service'
import { useAuthStore } from '@/store'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    const init = async () => {
      if (window.location.pathname === '/login') {
        setIsMounted(true)
        setLoading(false)

        return
      }

      try {
        const res = await AuthService.me()

        setUser(res.data.data)
        setIsAuthenticated(true)
      } catch {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
        setIsMounted(true)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.log('LOGOUT ERROR: ', JSON.stringify(error, null, 2))
    }

    setUser(null)
    setIsAuthenticated(false)
  }

  if (!isMounted) return null

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => useContext(AuthContext)

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { AuthService } from '@/services/auth.service'

type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
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
      const token = localStorage.getItem('token')

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        setIsMounted(true)
        return
      }

      try {
        const res = await AuthService.me()

        setUser(res.data.data)
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem('token')
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

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
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

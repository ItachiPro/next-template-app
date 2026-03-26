import { useAuthStore } from '../store/useAuthStore'

export const useAuth = () => {
  const user = useAuthStore((state) => state.user)

  const isSuperAdmin = user?.roles.includes('SUPER_ADMIN')

  const can = (permission: string) => {
    if (isSuperAdmin) return true

    return user?.permissions.includes(permission) ?? false
  }

  const hasRole = (role: string) => {
    if (isSuperAdmin) return true

    return user?.roles.includes(role) ?? false
  }

  return {
    user,
    can,
    hasRole,
    isSuperAdmin,
  }
}

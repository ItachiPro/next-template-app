import Link from 'next/link'
import { routes } from '../config'
import { useAuth } from '../hooks'

export const Navbar = () => {
  const { can } = useAuth()

  const visibleRoutes = routes.filter((route) => {
    if (!route.permission) return true

    return can(route.permission)
  })

  return (
    <nav>
      {visibleRoutes.map((route) => (
        <Link key={route.path} href={route.path}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

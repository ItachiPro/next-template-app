import {
  LayoutDashboard,
  Lock,
  LucideProps,
  Shield,
  UsersRound,
} from 'lucide-react'
import { ForwardRefExoticComponent } from 'react'

export type AppRoute = {
  path: string
  label: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  permission?: string
}

export const routes: AppRoute[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/users',
    label: 'Users',
    icon: UsersRound,
    permission: 'LIST_USER',
  },
  {
    path: '/roles',
    label: 'Roles',
    icon: Shield,
    permission: 'LIST_ROLE',
  },
  {
    path: '/permissions',
    label: 'Permissions',
    icon: Lock,
    permission: 'LIST_PERMISSION',
  },
]

export type AppRoute = {
  path: string
  label: string
  permission?: string
}

export const routes: AppRoute[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/users',
    label: 'Users',
    permission: 'LIST_USER',
  },
]

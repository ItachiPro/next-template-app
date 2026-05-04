import { RoleData } from '@/features'
import { RoleComponent } from '@/features/role/components'
import { RoleService } from '@/features/role/services'
import { getAuthHeaders } from '@/lib/auth-headers'
import { Pagination } from '@/types'
import { dateFormatted, getPaginationData } from '@/utils'

const RolePage = async () => {
  const headers = await getAuthHeaders()

  let roles: RoleData[] = []
  let errorMessage: string | null = null

  let pagination: Pagination = {
    from: null,
    to: null,
    total: 0,
    links: [],
  }

  try {
    const res = await RoleService.getRoles({ headers })

    if (res.status === 200) {
      const data = res.data

      roles = data.data.data.map((role) => ({
        ...role,
        created_at: dateFormatted(role.created_at),
        updated_at: dateFormatted(role.updated_at),
        permissions: role.permissions?.length,
      }))

      pagination = getPaginationData(data.data)
    }
  } catch (error: unknown) {
    errorMessage = String(error)
  }

  return (
    <RoleComponent
      initialData={roles}
      initialPagination={pagination}
      error={errorMessage}
    />
  )
}

export default RolePage

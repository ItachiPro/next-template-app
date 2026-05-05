import { PermissionComponent } from '@/features/permission/components'
import { getAuthHeaders } from '@/lib/auth-headers'
import { PermissionService } from '@/features/permission/services/permission.service'
import { Pagination } from '@/types'
import { dateFormatted, getPaginationData } from '@/utils'
import { Permission } from '@/features'

const PermissionPage = async () => {
  const headers = await getAuthHeaders()

  let permissions: Permission[] = []
  let errorMessage: string | null = null

  let pagination: Pagination = {
    from: null,
    to: null,
    total: 0,
    links: [],
  }

  try {
    const res = await PermissionService.getPermissions({ headers })

    if (res.status === 200) {
      const data = res.data

      permissions = data.data.data.map((permission) => ({
        ...permission,
        created_at: dateFormatted(permission.created_at),
        updated_at: dateFormatted(permission.updated_at),
      }))

      pagination = getPaginationData(data.data)
    }
  } catch (error: unknown) {
    errorMessage = String(error)
  }

  return (
    <PermissionComponent
      initialData={permissions}
      initialPagination={pagination}
      error={errorMessage}
    />
  )
}

export default PermissionPage

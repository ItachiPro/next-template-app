import { PermissionComponent } from '@/features/permission/components'
import { getAuthHeaders } from '@/lib/auth-headers'
import { PermissionService } from '@/features/permission/services/permission.service'
import { Pagination } from '@/types'
import { PermissionResponse } from '@/types/dto'
import { getPaginationData } from '@/utils'
import { Permission } from '@/features'

const PermissionPage = async () => {
  const headers = await getAuthHeaders()

  let permissions: Permission[] = []

  let pagination: Pagination = {
    from: null,
    to: null,
    total: 0,
    links: [],
  }

  try {
    const res = await PermissionService.getPermissions({ headers })

    if (res.status === 200) {
      const data: PermissionResponse = res.data

      permissions = data.data.data

      pagination = getPaginationData(data.data)
    }
  } catch (error) {
    console.log('ERROR: ', error)
  }

  return (
    <PermissionComponent
      initialData={permissions}
      initialPagination={pagination}
    />
  )
}

export default PermissionPage

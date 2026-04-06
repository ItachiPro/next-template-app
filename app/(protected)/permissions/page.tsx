import { PermissionComponent } from '@/app/components/Permission'
import { getAuthHeaders } from '@/app/lib/auth-headers'
import { PermissionService } from '@/app/services/permission.service'
import { Pagination, Permission } from '@/app/types'
import { PermissionResponse } from '@/app/types/types'
import { getPaginationData } from '@/app/utils'

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

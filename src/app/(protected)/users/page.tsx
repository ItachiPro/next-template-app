import { getAuthHeaders } from '@/lib/auth-headers'
import { UserService } from '@/features/user/services/user.service'
import { Pagination } from '@/types'
import { dateFormatted, getPaginationData } from '@/utils'
import { UserComponent, UserData } from '@/features'

const UserPage = async () => {
  const headers = await getAuthHeaders()

  let users: UserData[] = []
  let errorMessage: string | null = null

  let pagination: Pagination = {
    from: null,
    to: null,
    total: 0,
    links: [],
  }

  try {
    const res = await UserService.getUsers({ headers })

    if (res.status === 200) {
      const data = res.data

      users = data.data.data.map((user) => ({
        ...user,
        created_at: dateFormatted(user.created_at),
        updated_at: dateFormatted(user.updated_at),
        roles: user.roles?.length,
        permission: user.permissions?.length,
      }))

      pagination = getPaginationData(data.data)
    }
  } catch (error: unknown) {
    errorMessage = String(error)
  }

  return (
    <UserComponent
      initialData={users}
      initialPagination={pagination}
      error={errorMessage}
    />
  )
}

export default UserPage

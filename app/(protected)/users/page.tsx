import { UserComponent } from '@/app/components'
import { getAuthHeaders } from '@/app/lib/auth-headers'
import { UserService } from '@/app/services/user.service'
import { Pagination, User } from '@/app/types'
import { UserResponse } from '@/app/types/types'
import { getPaginationData } from '@/app/utils'

const UserPage = async () => {
  const headers = await getAuthHeaders()

  let users: User[] = []
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
      const data: UserResponse = res.data

      users = data.data.data
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

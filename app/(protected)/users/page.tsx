import { getAuthHeaders } from '@/lib/auth-headers'
import { UserService } from '@/features/user/services/user.service'
import { Pagination } from '@/types'
import { UserResponse } from '@/types/dto'
import { getPaginationData } from '@/utils'
import { User, UserComponent } from '@/features'

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

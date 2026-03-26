'use client'

import { Protected } from '@/app/components'

const UserPage = () => {
  return (
    <Protected permission="LIST_USER">
      <div>Users</div>
    </Protected>
  )
}

export default UserPage

'use client'

import { Protected } from '@/app/components'

const RolePage = () => {
  return (
    <Protected permission="LIST_ROLE">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1>Roles</h1>
      </div>
    </Protected>
  )
}

export default RolePage

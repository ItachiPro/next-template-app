'use client'

import { Protected } from '@/app/components'

const PermissionPage = () => {
  return (
    <Protected permission="LIST_PERMISSION">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1>Permissions</h1>
      </div>
    </Protected>
  )
}

export default PermissionPage

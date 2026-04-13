'use client'

import { User } from '../types'

type Props = {
  user: User | null
  onSuccess: () => void
}

export const AssignRoleForm = () => {
  return (
    <div className="flex gap-6">
      <div className="w-1/2 border rounded p-4">
        <h3 className="font-bold mb-2">Available roles</h3>
        <ul>
          <li className="flex justify-between items-center py-1">Role</li>
        </ul>
      </div>

      <div className="w-1/2 border rounded p-4">
        <h3 className="font-bold mb-2">Assigned roles</h3>
        <ul>
          <li className="flex justify-between items-center py-1">Role</li>
        </ul>
      </div>
    </div>
  )
}

'use client'

import { Role } from '@/features/role'
import { User } from '../types'

type Props = {
  user: User | null
  onSuccess: () => void
  roles: Role[]
}

export const AssignRoleForm = ({ user, onSuccess, roles }: Props) => {
  return (
    <div className="flex gap-6">
      <div className="w-1/2 border rounded p-4 text-gray-500">
        <h3 className="font-bold mb-2">Available roles</h3>
        <ul>
          {roles.length > 0 &&
            roles.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="flex justify-between items-center py-1 text-gray-500"
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="w-1/2 border rounded p-4 text-gray-500">
        <h3 className="font-bold mb-2">Assigned roles</h3>
        <ul>
          <li className="flex justify-between items-center py-1 text-gray-500">
            Role
          </li>
        </ul>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { DataTable, Protected } from '@/app/components'
import { UserService } from '@/services/user.service'
import { User } from '@/types'
import { Pencil, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'

const UserPage = () => {
  const hasFetched = useRef(false)

  const [users, setUsers] = useState([])

  const editUser = (user: User) => {
    console.log('EDIT: ', JSON.stringify(user, null, 2))
  }

  const deleteUser = (user: User) => {
    console.log('DELETE: ', JSON.stringify(user, null, 2))
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchUsers = async () => {
      const res = await UserService.getUsers()

      if (res.status === 200) {
        setUsers(res.data.data.data)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Protected permission="LIST_USER">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-gray-500">Users</h1>
      </div>

      <div className="mt-6">
        <DataTable
          headers={[
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Email',
              value: 'email',
            },
          ]}
          data={users}
          renderActions={(row) => (
            <>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                onClick={() => {}}
              >
                <UserRoundCog size={18} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
                onClick={() => {}}
              >
                <UserRoundKey size={18} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                onClick={() => editUser(row)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                onClick={() => deleteUser(row)}
              >
                <Trash size={18} />
              </button>
            </>
          )}
        />
      </div>
    </Protected>
  )
}

export default UserPage

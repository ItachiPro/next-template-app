'use client'

import { DataTable, Protected } from '@/app/components'
import { UserService } from '@/services/user.service'
import { User } from '@/types'
import { useEffect, useRef, useState } from 'react'

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
        <h1 className="text-black">Users</h1>
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
          onEdit={(user) => editUser(user)}
          onDelete={(user) => deleteUser(user)}
        />
      </div>
    </Protected>
  )
}

export default UserPage

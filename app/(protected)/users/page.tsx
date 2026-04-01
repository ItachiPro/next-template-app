'use client'

import { useEffect, useRef, useState } from 'react'
import { DataTable, Protected, UserFormModal } from '@/app/components'
import { UserService } from '@/services/user.service'
import { Pagination, User } from '@/types'
import { Pencil, Plus, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'
import { UserResponse } from '@/types/types'
import { getPaginationData } from '@/utils'

const UserPage = () => {
  const hasFetched = useRef(false)

  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const [pagination, setPagination] = useState<Pagination>({
    from: null,
    to: null,
    total: 0,
    links: [],
  })

  const handleOpenModal = (isEdit: boolean) => {
    if (isEdit) {
      setMode('edit')
    } else {
      setMode('create')
    }

    setOpen(true)
  }

  const editUser = (user: User) => {
    console.log('EDIT: ', JSON.stringify(user, null, 2))
  }

  const deleteUser = (user: User) => {
    console.log('DELETE: ', JSON.stringify(user, null, 2))
  }

  const changePage = async (page: number) => {
    const res = await UserService.getUsers({ page })

    if (res.status === 200) {
      const data: UserResponse = res.data

      setUsers(data.data.data)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchUsers = async () => {
      const res = await UserService.getUsers()

      if (res.status === 200) {
        const data: UserResponse = res.data

        setUsers(data.data.data)

        const pagination = getPaginationData(data.data)
        setPagination(pagination)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Protected permission="LIST_USER">
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Users</h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-100 transition"
          onClick={() => handleOpenModal(false)}
        >
          <Plus size={18} />
        </button>
      </div>

      <UserFormModal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        onSuccess={() => {}}
      />

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
          pagination={pagination}
          onPageChange={changePage}
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
                onClick={() => handleOpenModal(true)}
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

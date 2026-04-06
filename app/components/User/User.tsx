'use client'

import { useState } from 'react'
import { UserService } from '@/app/services/user.service'
import { FormAction, Pagination, User } from '@/app/types'
import { UserResponse } from '@/app/types/types'
import { getPaginationData } from '@/app/utils'
import { Protected } from '../Protected'
import { Pencil, Plus, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'
import { UserFormModal } from './UserFormModal'
import { DataTable } from '../DataTable'

type Props = {
  initialData: User[]
  initialPagination: Pagination
}

export const UserComponent = ({ initialData, initialPagination }: Props) => {
  const [users, setUsers] = useState<User[]>(initialData)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const handleOpenModal = (isEdit: boolean) => {
    setMode(isEdit ? FormAction.Edit : FormAction.Create)

    setOpen(true)
  }

  const editUser = (user: User) => {
    console.log('EDIT: ', JSON.stringify(user, null, 2))
  }

  const deleteUser = (user: User) => {
    console.log('DELETE: ', JSON.stringify(user, null, 2))
  }

  const changePage = async (page: number) => {
    const res = await UserService.getUsers({ params: { page } })

    if (res.status === 200) {
      const data: UserResponse = res.data

      setUsers(data.data.data)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

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

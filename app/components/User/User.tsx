'use client'

import { useEffect, useState } from 'react'
import { UserService } from '@/app/services/user.service'
import { FormAction, Pagination, ToastType, User } from '@/app/types'
import { UserResponse } from '@/app/types/types'
import { getPaginationData, getToastMessage } from '@/app/utils'
import { Protected } from '../Protected'
import { Pencil, Plus, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'
import { UserFormModal } from './UserFormModal'
import { DataTable } from '../DataTable'
import { ConfirmModal } from '../ConfirmModal'

type Props = {
  initialData: User[]
  initialPagination: Pagination
  error?: string | null
}

export const UserComponent = ({
  initialData,
  initialPagination,
  error,
}: Props) => {
  const [users, setUsers] = useState<User[]>(initialData)
  const [user, setUser] = useState<User | null>(null)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const handleOpenModal = (isEdit: boolean, user?: User) => {
    if (isEdit) {
      setMode(FormAction.Edit)
      setUser(user ? user : null)
    } else {
      setMode(FormAction.Create)
      setUser(null)
    }

    setOpen(true)
  }

  const handleOpenConfirmModal = (user: User) => {
    setUser(user ? user : null)
    setOpenConfirmModal(true)
  }

  const deleteUser = async (user: User | null) => {
    if (user === null) return

    try {
      const res = await UserService.deleteUser({ id: user.id })

      if (res.status === 204) {
        getToastMessage('User deleted successfully', ToastType.Success)
        getUsers()
      }
    } catch {
      getToastMessage('Error deleting user', ToastType.Error)
    }

    setOpenConfirmModal(false)
  }

  const getUsers = async (page?: number) => {
    const res = await UserService.getUsers({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data: UserResponse = res.data

      setUsers(data.data.data)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  useEffect(() => {
    if (error) {
      getToastMessage(error, ToastType.Error)
    }
  }, [error])

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
        user={user}
        onClose={() => setOpen(false)}
        onSuccess={getUsers}
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
          onPageChange={(page) => getUsers(page)}
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
                onClick={() => handleOpenModal(true, row)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                onClick={() => handleOpenConfirmModal(row)}
              >
                <Trash size={18} />
              </button>
            </>
          )}
          emptyState={
            <div className="flex flex-col items-center">
              <UserRoundCog size={40} className="text-gray-400 mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          }
        />
        <ConfirmModal
          isOpen={openConfirmModal}
          title="Confirm deletion"
          message={`Are you sure you want to delete user ${user?.name}?`}
          onCancel={() => setOpenConfirmModal(false)}
          onConfirm={() => deleteUser(user)}
        />
      </div>
    </Protected>
  )
}

'use client'

import { useEffect } from 'react'
import { Pagination, ToastType, User } from '@/app/types'
import { getToastMessage } from '@/app/utils'
import { Protected } from '../Protected'
import { Pencil, Plus, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'
import { UserFormModal } from './UserFormModal'
import { DataTable } from '../DataTable'
import { ConfirmModal } from '../ConfirmModal'
import { useAuth } from '@/app/hooks'
import { useUser } from './useUser'

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
  const { can } = useAuth()

  const {
    users,
    user,
    pagination,
    openModal,
    openConfirmModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    getUsers,
    deleteUser,
  } = useUser({
    initialData,
    initialPagination,
  })

  useEffect(() => {
    if (error) {
      getToastMessage(error, ToastType.Error)
    }
  }, [error])

  return (
    <Protected permission="LIST_USER">
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Users</h1>

        {can('CREATE_USER') && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-100 transition"
            onClick={() => handleOpenModal(false)}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <UserFormModal
        open={openModal}
        mode={mode}
        user={user}
        onClose={handleCloseModal}
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
              {can('ASSIGN_ROLE_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  onClick={() => {}}
                >
                  <UserRoundCog size={18} />
                </button>
              )}

              {can('ASSIGN_PERMISSION_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
                  onClick={() => {}}
                >
                  <UserRoundKey size={18} />
                </button>
              )}

              {can('UPDATE_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => handleOpenModal(true, row)}
                >
                  <Pencil size={18} />
                </button>
              )}

              {can('DELETE_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  onClick={() => handleOpenConfirmModal(row)}
                >
                  <Trash size={18} />
                </button>
              )}
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
          onCancel={handleCloseConfirmModal}
          onConfirm={() => deleteUser(user)}
        />
      </div>
    </Protected>
  )
}

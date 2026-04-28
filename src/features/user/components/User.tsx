'use client'

import { useEffect } from 'react'
import { Pencil, Plus, Trash, UserRoundCog, UserRoundKey } from 'lucide-react'
import { Pagination, ToastType } from '@/types'
import { getToastMessage } from '@/utils'
import { DataTable, ConfirmModal, Protected, EmptyData } from '@/components'
import { useAuth } from '@/hooks'
import { useUser } from '../hooks'
import { UserFormModal } from './UserFormModal'
import { UserAssignRoleModal } from './UserAssignRoleModal'
import { UserData } from '../types'
import { UserAssignPermissionModal } from './UserAssignPermissionModal'

type Props = {
  initialData: UserData[]
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
    loading,
    users,
    user,
    userWithRoles,
    pagination,
    openModal,
    openConfirmModal,
    openAssignRoleModal,
    openAssignPermissionModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleOpenAssignModal,
    handleCloseAssignRoleModal,
    handleCloseAssignPermissionModal,
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

      <UserAssignRoleModal
        open={openAssignRoleModal}
        user={userWithRoles}
        onClose={handleCloseAssignRoleModal}
      />

      <UserAssignPermissionModal
        open={openAssignPermissionModal}
        user={userWithRoles}
        onClose={handleCloseAssignPermissionModal}
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
            {
              label: 'Created',
              value: 'created_at',
            },
            {
              label: 'Updated',
              value: 'updated_at',
            },
          ]}
          data={users}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => getUsers(page)}
          renderActions={(row) => (
            <>
              {can('ASSIGN_ROLE_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  onClick={() => handleOpenAssignModal(row, true)}
                >
                  <UserRoundCog size={18} />
                </button>
              )}

              {can('ASSIGN_PERMISSION_USER') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
                  onClick={() => handleOpenAssignModal(row, false)}
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
          emptyState={<EmptyData message={'No users found'} />}
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

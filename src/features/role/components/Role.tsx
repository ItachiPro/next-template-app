'use client'

import { useEffect } from 'react'
import { Pagination, ToastType } from '@/types'
import { RoleData } from '../types'
import { useAuth } from '@/hooks'
import { useRole } from '../hooks'
import { getToastMessage } from '@/utils'
import { ConfirmModal, DataTable, EmptyData, Protected } from '@/components'
import { Pencil, Plus, Trash, UserRoundKey } from 'lucide-react'
import { RoleFormModal } from './RoleFormModal'
import { RoleAssignPermissionModal } from './RoleAssignPermissionModal'

type Props = {
  initialData: RoleData[]
  initialPagination: Pagination
  error?: string | null
}

export const RoleComponent = ({
  initialData,
  initialPagination,
  error,
}: Props) => {
  const { can } = useAuth()

  const {
    loading,
    roles,
    role,
    roleWithPermission,
    pagination,
    openModal,
    openConfirmModal,
    openAssignPermissionModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleOpenAssignModal,
    handleCloseAssignPermissionModal,
    getRoles,
    deleteRole,
  } = useRole({
    initialData,
    initialPagination,
  })

  useEffect(() => {
    if (error) {
      getToastMessage(error, ToastType.Error)
    }
  }, [error])

  return (
    <Protected permission="LIST_ROLE">
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Roles</h1>

        {can('CREATE_ROLE') && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-100 transition"
            onClick={() => handleOpenModal(false)}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <RoleFormModal
        open={openModal}
        mode={mode}
        role={role}
        onClose={handleCloseModal}
        onSuccess={getRoles}
      />

      <RoleAssignPermissionModal
        open={openAssignPermissionModal}
        role={roleWithPermission}
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
              label: 'Created',
              value: 'created_at',
            },
            {
              label: 'Updated',
              value: 'updated_at',
            },
          ]}
          data={roles}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => getRoles(page)}
          renderActions={(row) => (
            <>
              {can('ASSIGN_PERMISSION_ROLE') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
                  onClick={() => handleOpenAssignModal(row)}
                >
                  <UserRoundKey size={18} />
                </button>
              )}

              {can('UPDATE_ROLE') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => handleOpenModal(true, row)}
                >
                  <Pencil size={18} />
                </button>
              )}

              {can('DELETE_ROLE') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  onClick={() => handleOpenConfirmModal(row)}
                >
                  <Trash size={18} />
                </button>
              )}
            </>
          )}
          emptyState={<EmptyData message={'No roles found'} />}
        />

        <ConfirmModal
          isOpen={openConfirmModal}
          title="Confirm deletion"
          message={`Are you sure you want to delete role ${role?.name}?`}
          onCancel={handleCloseConfirmModal}
          onConfirm={() => deleteRole(role)}
        />
      </div>
    </Protected>
  )
}

'use client'

import { useEffect } from 'react'
import { Pencil, Plus, Trash } from 'lucide-react'
import { Pagination, ToastType } from '@/types'
import { getToastMessage } from '@/utils'
import { ConfirmModal, DataTable, EmptyData, Protected } from '@/components'
import { Permission } from '../types'
import { useAuth } from '@/hooks'
import { usePermission } from '../hooks'
import { PermissionFormModal } from './PermissionFormModal'

type Props = {
  initialData: Permission[]
  initialPagination: Pagination
  error?: string | null
}

export const PermissionComponent = ({
  initialData,
  initialPagination,
  error,
}: Props) => {
  const { can } = useAuth()

  const {
    permissions,
    permission,
    pagination,
    openModal,
    openConfirmModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    getPermissions,
    deletePermission,
  } = usePermission({
    initialData,
    initialPagination,
  })

  useEffect(() => {
    if (error) {
      getToastMessage(error, ToastType.Error)
    }
  }, [error])

  return (
    <Protected permission="LIST_PERMISSION">
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
        <h1 className="text-gray-500 text-lg font-semibold">Permissions</h1>

        {can('CREATE_PERMISSION') && (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-100 transition"
            onClick={() => handleOpenModal(false)}
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <PermissionFormModal
        open={openModal}
        mode={mode}
        permission={permission}
        onClose={handleCloseModal}
        onSuccess={getPermissions}
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
          data={permissions}
          pagination={pagination as Pagination}
          onPageChange={(page) => getPermissions(page)}
          renderActions={(row) => (
            <>
              {can('UPDATE_PERMISSION') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => handleOpenModal(true, row)}
                >
                  <Pencil size={18} />
                </button>
              )}

              {can('DELETE_PERMISSIONS') && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  onClick={() => handleOpenConfirmModal(row)}
                >
                  <Trash size={18} />
                </button>
              )}
            </>
          )}
          emptyState={<EmptyData message={'No permissions found'} />}
        />

        <ConfirmModal
          isOpen={openConfirmModal}
          title="Confirm deletion"
          message={`Are you sure you want to delete user ${permission?.name}?`}
          onCancel={handleCloseConfirmModal}
          onConfirm={() => deletePermission(permission)}
        />
      </div>
    </Protected>
  )
}

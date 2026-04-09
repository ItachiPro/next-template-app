'use client'

import { useState } from 'react'
import { FormAction, Pagination, Permission } from '@/app/types'
import { PermissionService } from '@/app/services/permission.service'
import { PermissionResponse } from '@/app/types/dto'
import { getPaginationData } from '@/app/utils'
import { Protected } from '../Protected'
import { DataTable } from '../DataTable'
import { Pencil, Trash } from 'lucide-react'

type Props = {
  initialData: Permission[]
  initialPagination: Pagination
}

export const PermissionComponent = ({
  initialData,
  initialPagination,
}: Props) => {
  const [permissions, setPermissions] = useState<Permission[]>(initialData)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const editPermission = (permission: Permission) => {
    console.log('EDIT: ', JSON.stringify(permission, null, 2))
  }

  const deletePermission = (permission: Permission) => {
    console.log('DELETE: ', JSON.stringify(permission, null, 2))
  }

  const changePage = async (page: number) => {
    const res = await PermissionService.getPermissions({ params: { page } })

    if (res.status === 200) {
      const data: PermissionResponse = res.data

      setPermissions(data.data.data)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  return (
    <Protected permission="LIST_PERMISSION">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-gray-500">Permissions</h1>
      </div>

      <div className="mt-6">
        <DataTable
          headers={[
            {
              label: 'Name',
              value: 'name',
            },
          ]}
          data={permissions}
          pagination={pagination as Pagination}
          onPageChange={changePage}
          renderActions={(row) => (
            <>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                onClick={() => editPermission(row)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                onClick={() => deletePermission(row)}
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

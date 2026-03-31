'use client'

import { useEffect, useRef, useState } from 'react'
import { DataTable, Protected } from '@/app/components'
import { PermissionService } from '@/services/permission.service'
import { Pencil, Trash } from 'lucide-react'
import { Pagination, Permission } from '@/types'

const PermissionPage = () => {
  const hasFetched = useRef(false)

  const [permissions, setPermissions] = useState([])
  const [pagination, setPagination] = useState({})

  const editPermission = (permission: Permission) => {
    console.log('EDIT: ', JSON.stringify(permission, null, 2))
  }

  const deletePermission = (permission: Permission) => {
    console.log('DELETE: ', JSON.stringify(permission, null, 2))
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchPermissions = async () => {
      const res = await PermissionService.getPermissions()

      if (res.status === 200) {
        setPermissions(res.data.data.data)
        const paginationData = {
          from: res.data.data.from,
          to: res.data.data.to,
          total: res.data.data.total,
          links: res.data.data.links.map((link) => ({
            label: link.label,
            page: link.page,
            active: link.active,
          })),
        }
        setPagination(paginationData)
      }
    }

    fetchPermissions()
  }, [])

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

export default PermissionPage

'use client'

import { useEffect, useMemo, useState } from 'react'
import { User } from '../types'
import { Permission } from '@/features/permission'
import { PermissionService } from '@/features/permission/services'
import { PermissionsResponse } from '@/types'
import { Modal } from '@/components'
import { AssignPermissionForm } from './AssignPermissionForm'

type Props = {
  open: boolean
  user: User | null
  onClose: () => void
}

export const UserAssignPermissionModal = ({ open, user, onClose }: Props) => {
  const [permissions, setPermissions] = useState<Permission[]>([])

  const assignedPermissions = useMemo(() => {
    if (!user) {
      return []
    }

    const permissions =
      user.permission && user.permission.length > 0
        ? user.permission.map((permission) => permission.name)
        : []

    return permissions
  }, [user])

  useEffect(() => {
    if (!user) {
      return
    }

    const getPermission = async () => {
      const res = await PermissionService.getPermissions({
        params: { pagination: false },
      })

      if (res.status === 200) {
        const data: PermissionsResponse = res.data

        setPermissions(data.data)
      }
    }

    getPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  return (
    <Modal open={open} onClose={onClose} title="Assign permissions">
      <AssignPermissionForm
        user={user}
        permissions={permissions}
        assignedPermissions={assignedPermissions}
        onSuccess={() => {
          onClose()
        }}
        onClose={onClose}
      />
    </Modal>
  )
}

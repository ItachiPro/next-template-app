'use client'

import { useEffect, useMemo, useState } from 'react'
import { Role } from '../types'
import { Permission } from '@/features/permission'
import { PermissionService } from '@/features/permission/services'
import { PermissionsResponse } from '@/types'
import { AssignPermissionForm, Modal } from '@/components'
import { RoleService } from '../services'

type Props = {
  open: boolean
  role: Role | null
  onClose: () => void
}

export const RoleAssignPermissionModal = ({ open, role, onClose }: Props) => {
  const [permissions, setPermissions] = useState<Permission[]>([])

  const assignedPermissions = useMemo(() => {
    if (!role) {
      return []
    }

    const permissions =
      role.permissions && role.permissions.length > 0
        ? role.permissions.map((permission) => permission.name)
        : []

    return permissions
  }, [role])

  useEffect(() => {
    if (!role) {
      return
    }

    const getPermissions = async () => {
      const res = await PermissionService.getPermissions({
        params: { pagination: false },
      })

      if (res.status === 200) {
        const data: PermissionsResponse = res.data

        setPermissions(data.data)
      }
    }

    getPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role?.id])

  return (
    <Modal open={open} onClose={onClose} title="Assign permissions">
      <AssignPermissionForm
        id={role?.id ?? null}
        allPermissions={permissions}
        assignedPermissions={assignedPermissions}
        onSuccess={() => {
          onClose()
        }}
        onClose={onClose}
        assignService={(id, permissions) =>
          RoleService.assignPermissions({ id, data: { permissions } })
        }
      />
    </Modal>
  )
}

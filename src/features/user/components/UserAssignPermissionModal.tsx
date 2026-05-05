'use client'

import { useEffect, useMemo, useState } from 'react'
import { User } from '../types'
import { Permission } from '@/features/permission'
import { AssignPermissionForm, Modal } from '@/components'
import { UserService } from '../services'
import { CatalogService } from '@/services/catalog.service'

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
      user.permissions && user.permissions.length > 0
        ? user.permissions.map((permission) => permission.name)
        : []

    return permissions
  }, [user])

  const inheritedPermissionIds = useMemo(() => {
    if (!user) {
      return []
    }

    const ids = new Set<number>()

    user.roles?.forEach((role) => {
      role.permissions?.forEach((p) => {
        if (p.id) ids.add(p.id)
      })
    })

    return [...ids]
  }, [user])

  useEffect(() => {
    if (!user) {
      return
    }

    const getPermissions = async () => {
      const res = await CatalogService.getPermissions({
        params: { pagination: false },
      })

      if (res.status === 200) {
        const data = res.data

        setPermissions(data.data)
      }
    }

    getPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  return (
    <Modal open={open} onClose={onClose} title="Assign permissions">
      <AssignPermissionForm
        id={user?.id ?? null}
        allPermissions={permissions}
        assignedPermissions={assignedPermissions}
        disabledPermissionIds={inheritedPermissionIds}
        onSuccess={() => {
          onClose()
        }}
        onClose={onClose}
        assignService={(id, permissions) =>
          UserService.assignPermissions({ id, data: { permissions } })
        }
      />
    </Modal>
  )
}

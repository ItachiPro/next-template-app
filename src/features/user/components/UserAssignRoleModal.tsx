'use client'

import { useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { AssignRoleForm } from './AssignRoleForm'
import { User } from '../types'
import { Role } from '@/features/role'
import { CatalogService } from '@/services/catalog.service'

type Props = {
  open: boolean
  user: User | null
  onClose: () => void
}

export const UserAssignRoleModal = ({ open, user, onClose }: Props) => {
  const [roles, setRoles] = useState<Role[]>([])

  const assignedRoles = useMemo(() => {
    if (!user) {
      return []
    }

    const roles =
      user.roles && user.roles.length > 0
        ? user.roles.map((role) => role.name)
        : []

    return roles
  }, [user])

  useEffect(() => {
    if (!user) {
      return
    }

    const getRoles = async () => {
      const res = await CatalogService.getRoles({
        params: { pagination: false },
      })

      if (res.status === 200) {
        const data = res.data

        setRoles(data.data)
      }
    }

    getRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  return (
    <Modal open={open} onClose={onClose} title="Assign roles">
      <AssignRoleForm
        user={user}
        roles={roles}
        assignedRoles={assignedRoles}
        onSuccess={() => {
          onClose()
        }}
        onClose={onClose}
      />
    </Modal>
  )
}

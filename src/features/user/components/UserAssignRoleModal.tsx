'use client'

import { useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { AssignRoleForm } from './AssignRoleForm'
import { User } from '../types'
import { Role } from '@/features/role'
import { RoleService } from '@/features/role/services'
import { RoleResponse } from '@/types'
import { useAuthStore } from '@/store'

type Props = {
  open: boolean
  user: User | null
  onClose: () => void
}

export const UserAssignRoleModal = ({ open, user, onClose }: Props) => {
  const userStore = useAuthStore((state) => state.user)

  const [roles, setRoles] = useState<Role[]>([])

  const assignedRoles = useMemo(() => {
    if (!userStore) {
      return []
    }

    return userStore.roles
  }, [userStore])

  useEffect(() => {
    if (!user) {
      return
    }

    const getRoles = async () => {
      const res = await RoleService.getRoles({
        params: { pagination: false },
      })

      if (res.status === 200) {
        const data: RoleResponse = res.data

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
        onSuccess={() => {
          onClose()
        }}
        roles={roles}
        assignedRoles={assignedRoles}
      />
    </Modal>
  )
}

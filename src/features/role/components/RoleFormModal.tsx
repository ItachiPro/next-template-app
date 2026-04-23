'use client'

import { FormAction } from '@/types'
import { RoleData } from '../types'
import { Modal } from '@/components'
import { RoleForm } from './RoleForm'

type Props = {
  open: boolean
  mode: FormAction
  role?: RoleData | null
  onClose: () => void
  onSuccess: () => void
}

export const RoleFormModal = ({
  open,
  mode,
  role,
  onClose,
  onSuccess,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === FormAction.Create ? 'Create role' : 'Edit role'}
    >
      <RoleForm
        mode={mode}
        role={role}
        onSuccess={() => {
          onSuccess()
          onClose()
        }}
      />
    </Modal>
  )
}

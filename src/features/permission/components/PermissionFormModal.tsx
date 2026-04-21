'use client'

import { FormAction } from '@/types'
import { Permission } from '../types'
import { Modal } from '@/components'
import { PermissionForm } from './PermissionForm'

type Props = {
  open: boolean
  mode: FormAction
  permission?: Permission | null
  onClose: () => void
  onSuccess: () => void
}

export const PermissionFormModal = ({
  open,
  mode,
  permission,
  onClose,
  onSuccess,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        mode === FormAction.Create ? 'Create permission' : 'Edit permission'
      }
    >
      <PermissionForm
        mode={mode}
        permission={permission}
        onSuccess={() => {
          onSuccess()
          onClose()
        }}
      />
    </Modal>
  )
}

'use client'

import { FormAction } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { UserForm } from './UserForm'
import { User } from '../types'

type Props = {
  open: boolean
  mode: FormAction
  user?: User | null
  onClose: () => void
  onSuccess: () => void
}

export const UserFormModal = ({
  open,
  mode,
  user,
  onClose,
  onSuccess,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === FormAction.Create ? 'Create user' : 'Edit user'}
    >
      <UserForm
        mode={mode}
        user={user}
        onSuccess={() => {
          onSuccess()
          onClose()
        }}
      />
    </Modal>
  )
}

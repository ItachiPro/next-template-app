'use client'

import { User } from '@/types'
import { Modal } from '../Modal'
import { UserForm } from '../Form'

type Props = {
  open: boolean
  mode: 'create' | 'edit'
  user?: User
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
      title={mode === 'create' ? 'Create user' : 'Edit user'}
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

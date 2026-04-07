'use client'

import { FormAction, User } from '@/app/types'
import { Modal } from '../Modal'
import { UserForm } from '../Form'

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

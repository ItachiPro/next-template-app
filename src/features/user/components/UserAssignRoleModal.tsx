import { Modal } from '@/components/ui/Modal'
import { AssignRoleForm } from './AssignRoleForm'
import { User } from '../types'

type Props = {
  open: boolean
  user: User | null
  onClose: () => void
}

export const UserAssignRoleModal = ({ open, user, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose} title="Assign roles">
      <AssignRoleForm />
    </Modal>
  )
}

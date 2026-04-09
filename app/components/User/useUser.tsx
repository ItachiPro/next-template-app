import { UserService } from '@/app/services/user.service'
import {
  FormAction,
  Pagination,
  ToastType,
  User,
  UserResponse,
} from '@/app/types'
import { getPaginationData, getToastMessage } from '@/app/utils'
import { useState } from 'react'

type Props = {
  initialData: User[]
  initialPagination: Pagination
}

export const useUser = ({ initialData, initialPagination }: Props) => {
  const [users, setUsers] = useState<User[]>(initialData)
  const [user, setUser] = useState<User | null>(null)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openAssignRoleModal, setOpenAssignRoleModal] = useState<boolean>(false)
  const [openAssignPermissionModal, setOpenAssignPermissionModal] =
    useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const handleOpenModal = (isEdit: boolean, user?: User) => {
    if (isEdit) {
      setMode(FormAction.Edit)
      setUser(user ? user : null)
    } else {
      setMode(FormAction.Create)
      setUser(null)
    }

    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenConfirmModal(false)
  }

  const handleOpenConfirmModal = (user: User) => {
    setUser(user ? user : null)
    setOpenConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false)
  }

  const handleOpenAssignRoleModal = () => {}

  const handleCloseAssignRoleModal = () => {
    setOpenAssignRoleModal(false)
  }

  const handleOpenAssignPermissionModal = () => {}

  const handleCloseAssignPermissionModal = () => {
    setOpenAssignPermissionModal(false)
  }

  const getUsers = async (page?: number) => {
    const res = await UserService.getUsers({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data: UserResponse = res.data

      setUsers(data.data.data)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  const deleteUser = async (user: User | null) => {
    if (user === null) return

    try {
      const res = await UserService.deleteUser({ id: user.id })

      if (res.status === 204) {
        getToastMessage('User deleted successfully', ToastType.Success)
        getUsers()
      }
    } catch {
      getToastMessage('Error deleting user', ToastType.Error)
    }

    setOpenConfirmModal(false)
  }

  const assignRoles = async () => {}

  const assignPermissions = async () => {}

  return {
    users,
    user,
    pagination,
    openModal,
    openConfirmModal,
    openAssignRoleModal,
    openAssignPermissionModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleOpenAssignRoleModal,
    handleCloseAssignRoleModal,
    handleOpenAssignPermissionModal,
    handleCloseAssignPermissionModal,
    getUsers,
    deleteUser,
  }
}

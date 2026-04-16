'use client'

import { useState } from 'react'
import {
  FormAction,
  Pagination,
  ToastType,
  UserResponse,
  UsersPaginatedResponse,
} from '@/types'
import { getPaginationData, getToastMessage } from '@/utils'
import { UserService } from '../services'
import { User, UserData } from '../types'

type Props = {
  initialData: UserData[]
  initialPagination: Pagination
}

export const useUser = ({ initialData, initialPagination }: Props) => {
  const [users, setUsers] = useState<UserData[]>(initialData)
  const [user, setUser] = useState<UserData | null>(null)
  const [userWithRoles, setUserWithRoles] = useState<User | null>(null)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openAssignRoleModal, setOpenAssignRoleModal] = useState<boolean>(false)
  const [openAssignPermissionModal, setOpenAssignPermissionModal] =
    useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const handleOpenModal = (isEdit: boolean, user?: UserData) => {
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
    setOpenModal(false)
  }

  const handleOpenConfirmModal = (user: UserData) => {
    setUser(user ? user : null)
    setOpenConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false)
  }

  const handleOpenAssignRoleModal = async (user: UserData) => {
    try {
      const res = await UserService.getUser({
        id: user.id,
      })

      if (res.status === 200) {
        const data: UserResponse = res.data

        setUserWithRoles(data.data)
        setOpenAssignRoleModal(true)
      }
    } catch {
      getToastMessage('Error getting user', ToastType.Error)
    }
  }

  const handleCloseAssignRoleModal = () => {
    setOpenAssignRoleModal(false)
  }

  const handleOpenAssignPermissionModal = () => {
    setOpenAssignPermissionModal(true)
  }

  const handleCloseAssignPermissionModal = () => {
    setOpenAssignPermissionModal(false)
  }

  const getUsers = async (page?: number) => {
    const res = await UserService.getUsers({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data: UsersPaginatedResponse = res.data

      const users: UserData[] = data.data.data.map((user) => ({
        ...user,
        roles: user.roles?.length,
      }))

      setUsers(users)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  const deleteUser = async (user: UserData | null) => {
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
    userWithRoles,
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
    assignRoles,
    assignPermissions,
  }
}

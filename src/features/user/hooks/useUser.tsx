'use client'

import { useState } from 'react'
import { ApiError, FormAction, Pagination, ToastType } from '@/types'
import {
  dateFormatted,
  getPaginationData,
  getToastMessage,
  mapErrors,
} from '@/utils'
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
  const [loading, setLoading] = useState<boolean>(false)

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

  const handleOpenAssignModal = async (user: UserData, isRole: boolean) => {
    try {
      const res = await UserService.getUser({
        id: user.id,
      })

      if (res.status === 200) {
        const data = res.data

        setUserWithRoles(data.data)

        if (isRole) {
          setOpenAssignRoleModal(true)
        } else {
          setOpenAssignPermissionModal(true)
        }
      }
    } catch {
      getToastMessage('Error getting user.', ToastType.Error)
    }
  }

  const handleCloseAssignRoleModal = () => {
    setOpenAssignRoleModal(false)
  }

  const handleCloseAssignPermissionModal = () => {
    setOpenAssignPermissionModal(false)
  }

  const getUsers = async (page?: number) => {
    setLoading(true)
    const res = await UserService.getUsers({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data = res.data

      const users: UserData[] = data.data.data.map((user) => ({
        ...user,
        created_at: dateFormatted(user.created_at),
        updated_at: dateFormatted(user.updated_at),
        roles: user.roles?.length,
        permission: user.permissions?.length,
      }))

      setUsers(users)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }

    setLoading(false)
  }

  const deleteUser = async (user: UserData | null) => {
    if (user === null) return

    try {
      const res = await UserService.deleteUser({ id: user.id })

      if (res.status === 204) {
        getToastMessage('User deleted successfully.', ToastType.Success)
        getUsers()
      }
    } catch (error: unknown) {
      const err = error as ApiError

      mapErrors(err)
    }

    setOpenConfirmModal(false)
  }

  return {
    loading,
    users,
    user,
    userWithRoles,
    pagination,
    openModal,
    openConfirmModal,
    openAssignRoleModal,
    setOpenAssignRoleModal,
    openAssignPermissionModal,
    setOpenAssignPermissionModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleOpenAssignModal,
    handleCloseAssignRoleModal,
    handleCloseAssignPermissionModal,
    getUsers,
    deleteUser,
  }
}

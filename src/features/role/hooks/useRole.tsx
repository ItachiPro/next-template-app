'use client'

import { useState } from 'react'
import {
  ApiError,
  FormAction,
  Pagination,
  RoleResponse,
  RolesPaginatedResponse,
  ToastType,
} from '@/types'
import { Role, RoleData } from '../types'
import { RoleService } from '../services'
import {
  dateFormatted,
  getPaginationData,
  getToastMessage,
  mapErrors,
} from '@/utils'

type Props = {
  initialData: RoleData[]
  initialPagination: Pagination
}

export const useRole = ({ initialData, initialPagination }: Props) => {
  const [roles, setRoles] = useState<RoleData[]>(initialData)
  const [role, setRole] = useState<RoleData | null>(null)
  const [roleWithPermission, setRoleWithPermissions] = useState<Role | null>(
    null,
  )
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openAssignPermissionModal, setOpenAssignPermissionModal] =
    useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOpenModal = (isEdit: boolean, role?: RoleData) => {
    if (isEdit) {
      setMode(FormAction.Edit)
      setRole(role ? role : null)
    } else {
      setMode(FormAction.Create)
      setRole(null)
    }

    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenConfirmModal = (role: RoleData) => {
    setRole(role ? role : null)
    setOpenConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false)
  }

  const handleOpenAssignModal = async (role: RoleData) => {
    try {
      const res = await RoleService.getRole({
        id: role.id,
      })

      if (res.status === 200) {
        const data: RoleResponse = res.data

        setRoleWithPermissions(data.data)
        setOpenAssignPermissionModal(true)
      }
    } catch {
      getToastMessage('Error getting role.', ToastType.Error)
    }
  }

  const handleCloseAssignPermissionModal = () => {
    setOpenAssignPermissionModal(false)
  }

  const getRoles = async (page?: number) => {
    setLoading(true)
    const res = await RoleService.getRoles({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data: RolesPaginatedResponse = res.data

      const roles: RoleData[] = data.data.data.map((role) => ({
        ...role,
        created_at: dateFormatted(role.created_at),
        updated_at: dateFormatted(role.updated_at),
        permissions: role.permissions?.length,
      }))

      setRoles(roles)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }

    setLoading(false)
  }

  const deleteRole = async (role: RoleData | null) => {
    if (role === null) return

    try {
      const res = await RoleService.deleteRole({ id: role.id })

      if (res.status === 204) {
        getToastMessage('Role deleted successfully.', ToastType.Success)
        getRoles()
      }
    } catch (error: unknown) {
      const err = error as ApiError

      mapErrors(err)
    }

    setOpenConfirmModal(false)
  }

  return {
    loading,
    roles,
    role,
    roleWithPermission,
    pagination,
    openModal,
    openConfirmModal,
    openAssignPermissionModal,
    setOpenAssignPermissionModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    handleOpenAssignModal,
    handleCloseAssignPermissionModal,
    getRoles,
    deleteRole,
  }
}

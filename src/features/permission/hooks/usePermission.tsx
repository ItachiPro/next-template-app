'use client'

import { useState } from 'react'
import {
  ApiError,
  FormAction,
  Pagination,
  PermissionsPaginatedResponse,
  ToastType,
} from '@/types'
import { Permission } from '../types'
import { PermissionService } from '../services'
import {
  dateFormatted,
  getPaginationData,
  getToastMessage,
  mapErrors,
} from '@/utils'

type Props = {
  initialData: Permission[]
  initialPagination: Pagination
}

export const usePermission = ({ initialData, initialPagination }: Props) => {
  const [permissions, setPermissions] = useState<Permission[]>(initialData)
  const [permission, setPermission] = useState<Permission | null>(null)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [mode, setMode] = useState<FormAction>(FormAction.Create)

  const handleOpenModal = (isEdit: boolean, permission?: Permission) => {
    if (isEdit) {
      setMode(FormAction.Edit)
      setPermission(permission ? permission : null)
    } else {
      setMode(FormAction.Create)
      setPermission(null)
    }

    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenConfirmModal = (permission: Permission) => {
    setPermission(permission ? permission : null)
    setOpenConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false)
  }

  const getPermissions = async (page?: number) => {
    const res = await PermissionService.getPermissions({
      params: { ...(page ? { page } : {}) },
    })

    if (res.status === 200) {
      const data: PermissionsPaginatedResponse = res.data

      const permissions: Permission[] = data.data.data.map((permission) => ({
        ...permission,
        created_at: dateFormatted(permission.created_at),
        updated_at: dateFormatted(permission.updated_at),
      }))

      setPermissions(permissions)

      const pagination = getPaginationData(data.data)
      setPagination(pagination)
    }
  }

  const deletePermission = async (permission: Permission | null) => {
    if (permission === null) return

    try {
      const res = await PermissionService.deletePermission({
        id: permission.id,
      })

      if (res.status === 204) {
        getToastMessage('Permission deleted successfully', ToastType.Success)
      }
    } catch (error: unknown) {
      const err = error as ApiError

      mapErrors(err)
    }

    setOpenConfirmModal(false)
  }

  return {
    permissions,
    permission,
    pagination,
    openModal,
    openConfirmModal,
    mode,
    handleOpenModal,
    handleCloseModal,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    getPermissions,
    deletePermission,
  }
}

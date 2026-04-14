'use client'

import { useMemo, useState } from 'react'
import { Role } from '@/features/role'
import { User } from '../types'
import { MoveLeft, MoveRight } from 'lucide-react'
import { SelectedColor, SelectList } from '@/components'

type Props = {
  user: User | null
  onSuccess: () => void
  assignedRoles: string[]
  roles: Role[]
}

export const AssignRoleForm = ({
  user,
  onSuccess,
  assignedRoles,
  roles,
}: Props) => {
  const [currentAssigned, setCurrentAssigned] =
    useState<string[]>(assignedRoles)

  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([])
  const [selectedAssigned, setSelectedAssigned] = useState<string[]>([])

  const availableRoles = useMemo(() => {
    const assignedSet = new Set(currentAssigned)

    return roles.filter((role) => !assignedSet.has(role.name))
  }, [roles, currentAssigned])

  const availableRolesMapped = availableRoles.map((r) => r.name)

  const toggleSelection = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value))
    } else {
      setList([...list, value])
    }
  }

  const moveToAssigned = () => {
    setCurrentAssigned((prev) => [...prev, ...selectedAvailable])
    setSelectedAvailable([])
  }

  const moveToAvailable = () => {
    setCurrentAssigned((prev) =>
      prev.filter((role) => !selectedAssigned.includes(role)),
    )
    setSelectedAssigned([])
  }

  return (
    <div className="flex gap-6 items-center">
      <SelectList
        title="Available roles"
        itemList={availableRolesMapped}
        selected={selectedAvailable}
        selectedColor={SelectedColor.Blue}
        onToggle={(value) => {
          toggleSelection(value, selectedAvailable, setSelectedAvailable)
        }}
      />

      <div className="flex flex-col gap-2">
        <button
          onClick={moveToAssigned}
          disabled={selectedAvailable.length === 0}
          className={`px-3 py-1 border rounded ${selectedAvailable.length > 0 ? 'text-blue-600' : 'text-gray-600'} disabled:opacity-50`}
        >
          <MoveRight />
        </button>
        <button
          onClick={moveToAvailable}
          disabled={selectedAssigned.length === 0}
          className={`px-3 py-1 border rounded ${selectedAssigned.length > 0 ? 'text-red-600' : 'text-gray-600'} disabled:opacity-50`}
        >
          <MoveLeft />
        </button>
      </div>

      <SelectList
        title="Assigned roles"
        itemList={currentAssigned}
        selected={selectedAssigned}
        selectedColor={SelectedColor.Red}
        onToggle={(value) => {
          toggleSelection(value, selectedAssigned, setSelectedAssigned)
        }}
      />
    </div>
  )
}

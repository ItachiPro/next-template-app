'use client'

import { useMemo, useState } from 'react'
import { SelectedColor, SelectList } from '../SelectList'
import { MoveLeft, MoveRight } from 'lucide-react'

type Props<T> = {
  items: T[]
  value: T[]
  onChange: (value: T[]) => void
  getId: (item: T) => string | number
  getLabel: (item: T) => string
  leftTitle?: string
  rightTitle?: string
  disabledItems?: (string | number)[]
  hasError: boolean
}

export const DualListField = <T,>({
  items,
  value,
  onChange,
  getId,
  getLabel,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  disabledItems = [],
  hasError = false,
}: Props<T>) => {
  const [selectedLeft, setSelectedLeft] = useState<(string | number)[]>([])
  const [selectedRight, setSelectedRight] = useState<(string | number)[]>([])

  const selectedSet = useMemo(() => new Set(value.map(getId)), [value, getId])

  const disabledSet = useMemo(
    () => new Set(disabledItems ?? []),
    [disabledItems],
  )

  const availableItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !selectedSet.has(getId(item)) && !disabledSet.has(getId(item)),
      ),
    [items, selectedSet, disabledSet, getId],
  )

  const toggleSelection = (
    id: string | number,
    list: (string | number)[],
    setList: React.Dispatch<React.SetStateAction<(string | number)[]>>,
  ) => {
    if (list.includes(id)) {
      setList(list.filter((i) => i !== id))
    } else {
      setList([...list, id])
    }
  }

  const moveToRight = () => {
    const toAdd = items.filter(
      (item) =>
        selectedLeft.includes(getId(item)) && !disabledSet.has(getId(item)),
    )

    onChange([...value, ...toAdd])
    setSelectedLeft([])
  }

  const moveToLeft = () => {
    const newValue = value.filter(
      (item) =>
        !selectedRight.includes(getId(item)) || disabledSet.has(getId(item)),
    )

    onChange(newValue)
    setSelectedRight([])
  }

  return (
    <div className="flex gap-6 items-center">
      <SelectList
        title={leftTitle}
        itemList={availableItems.map(getLabel)}
        selected={availableItems
          .filter((item) => selectedLeft.includes(getId(item)))
          .map(getLabel)}
        selectedColor={SelectedColor.Blue}
        onToggle={(label) => {
          const item = availableItems.find((i) => getLabel(i) === label)
          if (!item) return

          toggleSelection(getId(item), selectedLeft, setSelectedLeft)
        }}
      />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={moveToRight}
          disabled={selectedLeft.length === 0}
          className={`px-3 py-1 border rounded ${selectedLeft.length > 0 ? 'text-blue-600' : 'text-gray-600'} disabled:opacity-50`}
        >
          <MoveRight />
        </button>
        <button
          onClick={moveToLeft}
          disabled={selectedRight.length === 0}
          className={`px-3 py-1 border rounded ${selectedRight.length > 0 ? 'text-red-600' : 'text-gray-600'} disabled:opacity-50`}
        >
          <MoveLeft />
        </button>
      </div>

      <SelectList
        title={rightTitle}
        itemList={value.map(getLabel)}
        selected={value
          .filter((item) => selectedRight.includes(getId(item)))
          .map(getLabel)}
        selectedColor={SelectedColor.Red}
        hasError={hasError}
        onToggle={(label) => {
          const item = value.find((i) => getLabel(i) === label)
          if (!item) return

          if (disabledSet.has(getId(item))) return

          toggleSelection(getId(item), selectedRight, setSelectedRight)
        }}
      />
    </div>
  )
}

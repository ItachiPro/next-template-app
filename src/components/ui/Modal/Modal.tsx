'use client'

import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const Modal = ({ open, onClose, title, children }: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg z-10 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-gray-500 text-lg font-semibold">{title}</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </div>
  )
}

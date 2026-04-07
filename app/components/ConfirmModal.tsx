type Props = {
  isOpen: boolean
  title: string
  message: string
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
          <h2 className="text-gray-600 text-lg font-semibold mb-4">{title}</h2>

          <p className="text-sm text-gray-600 mb-6">{message}</p>

          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="text-gray-600 px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  )
}

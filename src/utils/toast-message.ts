import toast, { ToastOptions } from 'react-hot-toast'
import { ToastType } from '../types'

export const getToastMessage = (message: string, type: ToastType) => {
  const toastParams: ToastOptions = {
    duration: 5000,
    position: 'top-right',
  }

  switch (type) {
    case ToastType.Success:
      return toast.success(message, { ...toastParams })
    case ToastType.Error:
      return toast.error(message, { ...toastParams })
    default:
      return toast.success(message, { ...toastParams })
  }
}

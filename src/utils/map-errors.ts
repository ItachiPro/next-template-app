import { ApiError, ToastType } from '@/types'
import { getToastMessage } from './toast-message'

export const mapErrors = (errors: ApiError) => {
  if (typeof errors.errors === 'string') {
    return getToastMessage(errors.message, ToastType.Error)
  }

  if (errors.errors.length === 0) {
    return getToastMessage(errors.message, ToastType.Error)
  }

  return Object.values(errors.errors)
    .flat()
    .forEach((msg) => getToastMessage(msg, ToastType.Error))
}

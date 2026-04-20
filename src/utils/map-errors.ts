import { ToastType } from '@/types'
import { getToastMessage } from './toast-message'

export const mapErrors = (errors: string[]) => {
  if (typeof errors === 'string') {
    return getToastMessage(errors, ToastType.Error)
  }

  return Object.values(errors)
    .flat()
    .forEach((msg) => getToastMessage(msg, ToastType.Error))
}

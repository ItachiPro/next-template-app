import { FormError } from '@/types'
import { ZodError } from 'zod'

export const mapZodErrorsToFormErrors = (zodErrors: ZodError): FormError[] => {
  return zodErrors.issues.map((issue) => ({
    field: issue.path as string[],
    message: issue.message,
  }))
}

import { useState } from 'react'
import { FormError } from '@/types'
import { ZodType } from 'zod'
import { mapZodErrorsToFormErrors } from '@/utils'

type Props<T> = {
  initialValues: T
  schema: ZodType<T>
  onSubmit: (values: T) => void | Promise<void>
  validateOnBlur?: boolean
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  schema,
  onSubmit,
  validateOnBlur = false,
}: Props<T>) => {
  const [form, setForm] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormError[]>([])
  const [pending, setPending] = useState<boolean>(false)

  const setField = <K extends keyof T>(field: K, value: T[K]) => {
    setForm((p) => ({ ...p, [field]: value }))

    setErrors((prev) => prev.filter((e) => !e.field?.includes(field as string)))
  }

  const validate = () => {
    const result = schema.safeParse(form)

    if (!result.success) {
      setErrors(mapZodErrorsToFormErrors(result.error))
      return false
    }

    setErrors([])
    return true
  }

  const validateField = <K extends keyof T>(field: K) => {
    const result = schema.safeParse(form)

    if (!result.success) {
      const newErrors = mapZodErrorsToFormErrors(result.error)

      const fieldError = newErrors.find((e) =>
        e.field?.includes(field as string),
      )

      setErrors((prev) => [
        ...prev.filter((e) => !e.field?.includes(field as string)),
        ...(fieldError ? [fieldError] : []),
      ])
    }
  }

  const handleSubmit = async () => {
    if (pending) return

    if (!validate()) return

    try {
      setPending(true)
      await onSubmit(form)
    } finally {
      setPending(false)
    }
  }

  const getError = (field: keyof T) =>
    errors.find((e) => e.field?.includes(field as string))?.message

  const hasError = (field: keyof T) =>
    errors.some((e) => e.field?.includes(field as string))

  // ======================================================
  // INPUT (text, email, number)
  // ======================================================
  const getInputProps = <K extends keyof T>(field: K) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.type

      let value: T[K]

      if (type === 'number') {
        value = (e.target.value === '' ? '' : Number(e.target.value)) as T[K]
      } else {
        value = e.target.value as T[K]
      }

      setField(field, value)
    },
    onBlur: () => validateOnBlur && validateField(field),
  })

  // ======================================================
  // CHECKBOX
  // ======================================================
  const getCheckboxProps = <K extends keyof T>(field: K) => ({
    checked: Boolean(form[field]),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setField(field, e.target.checked as T[K])
    },
  })

  // ======================================================
  // SELECT
  // ======================================================
  const getSelectProps = <K extends keyof T>(field: K) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setField(field, e.target.value as T[K])
    },
    onBlur: () => validateOnBlur && validateField(field),
  })

  // ======================================================
  // TEXTAREA
  // ======================================================
  const getTextareaProps = <K extends keyof T>(field: K) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setField(field, e.target.value as T[K])
    },
    onBlur: () => validateOnBlur && validateField(field),
  })

  return {
    form,
    errors,
    pending,
    handleSubmit,
    getError,
    hasError,
    getInputProps,
    getCheckboxProps,
    getSelectProps,
    getTextareaProps,
  }
}

export type ApiErrorResponse = {
  success: boolean
  message?: string
  data?: null
  errors?: Record<string, string[]>
}

export type ApiSuccessResponse<TData> = {
  success: boolean
  message: string
  data: TData
  errors?: null
}

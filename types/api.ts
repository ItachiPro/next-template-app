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
  errors?: unknown | null
}

export type PaginationLinkResponse = {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

export type PaginatedResponse<TData> = {
  current_page: number
  data: TData[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: PaginationLinkResponse[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

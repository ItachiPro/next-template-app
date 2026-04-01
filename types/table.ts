export type TableHeader<T> = {
  label: string
  value: keyof T | 'action'
}

export type PaginationLink = {
  label: string
  page: number | null
  active: boolean
}

export type Pagination = {
  from: number | null
  to: number | null
  total: number
  links: PaginationLink[]
}

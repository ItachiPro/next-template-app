export type TableHeader<T> = {
  label: string
  value: keyof T | 'action'
}

export type paginationLink = {
  label: string
  page: number | null
  active: boolean
}

export type Pagination = {
  from: number
  to: number
  total: number
  links: paginationLink[]
}

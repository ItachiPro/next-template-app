export type TableHeader<T> = {
  label: string
  value: keyof T | 'action'
  render?: (row: T) => React.ReactNode
}

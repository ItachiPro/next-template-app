import { useMemo } from 'react'
import { Pagination, TableHeader } from '@/types'

type TableRow = Record<string, React.ReactNode>

type Props<TData extends TableRow> = {
  headers: TableHeader<TData>[]
  data: TData[]
  loading?: boolean
  pagination?: Pagination
  emptyState?: React.ReactElement
  onPageChange?: (page: number) => void
  renderActions?: (row: TData) => React.ReactNode
}

export const DataTable = <TData extends TableRow>({
  headers,
  data,
  loading = false,
  pagination,
  emptyState,
  onPageChange,
  renderActions,
}: Props<TData>) => {
  const tableHeaders = useMemo(() => {
    if (!renderActions) return headers

    return [
      ...headers,
      {
        label: 'Action',
        value: 'action',
      },
    ]
  }, [headers, renderActions])

  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {tableHeaders.map((item, index) => (
              <th
                key={`${String(item.value)}-${index}`}
                scope="col"
                className={`px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                  item.value === 'action' ? 'text-right' : 'text-left'
                }`}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {tableHeaders.map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className="px-6 py-10 text-center"
              >
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {tableHeaders.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-gray-800 ${
                      col.value === 'action' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.value === 'action' ? (
                      <div className="flex justify-end gap-2">
                        {renderActions?.(row)}
                      </div>
                    ) : (
                      (row[col.value as keyof TData] as React.ReactNode)
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {(data.length > 0 || loading) && (
        <nav className="flex items-center justify-between px-6 py-4">
          <span className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-heading">
              {pagination?.from}-{pagination?.to}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-heading">
              {pagination?.total}
            </span>
          </span>

          <div className="flex items-center gap-2">
            {pagination?.links?.map((link, index) => {
              const isDisabled = link.page === null

              const label = link.label
                .replace('&laquo;', '')
                .replace('&raquo;', '')
                .trim()

              return (
                <button
                  key={index}
                  disabled={isDisabled}
                  onClick={() => link.page && onPageChange?.(link.page)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                    link.active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}

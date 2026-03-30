import { useMemo } from 'react'
import { TableHeader } from '@/types'
import { Pencil, Trash } from 'lucide-react'

type TableRow = Record<string, React.ReactNode>

type Props<TData extends TableRow> = {
  headers: TableHeader<TData>[]
  data: TData[]
  onEdit?: (row: TData) => void
  onDelete?: (row: TData) => void
}

export const DataTable = <TData extends TableRow>({
  headers,
  data,
  onEdit,
  onDelete,
}: Props<TData>) => {
  const tableHeaders = useMemo(() => {
    return [
      ...headers,
      {
        label: 'Action',
        value: 'action',
      },
    ]
  }, [headers])

  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {tableHeaders.map((item, index) => (
              <th
                key={`${String(item.value)}-${index}`}
                scope="col"
                className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {tableHeaders.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-gray-800"
                >
                  {col.value === 'action' ? (
                    <div className="flex gap-2">
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        onClick={() => onEdit?.(row)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        onClick={() => onDelete?.(row)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ) : (
                    (row[col.value as keyof TData] as React.ReactNode)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="flex items-center justify-between px-6 py-4">
        <span className="text-sm text-gray-500">
          Showing <span className="font-semibold text-heading">1-10</span> of{' '}
          <span className="font-semibold text-heading">100</span>
        </span>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition">
            Next
          </button>
        </div>
      </nav>
    </div>
  )
}

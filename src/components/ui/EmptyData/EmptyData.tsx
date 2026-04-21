import { Inbox } from 'lucide-react'

type Props = {
  message: string
}

export const EmptyData = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Inbox size={40} className="text-gray-400 mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

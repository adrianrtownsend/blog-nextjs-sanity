import { CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/20/solid'
import { formatDateRelative } from 'components/Cards/TodoCard'
import ConfirmModal from 'components/Modals/ConfirmModal'

export interface IItemHeaderProps {
  item?: {
    title?: string
    user?: any
    date?: string
    completed?: boolean
  }
  onConfirm?: () => Promise<void>
}

const ItemHeader = ({ item, onConfirm }: IItemHeaderProps) => {
  return (
    <div className="flex flex-wrap  lg:items-center lg:justify-between m-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {item.title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <UserIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {item?.user?.name || item?.user?.nickname}
          </div>
          {item.date && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {formatDateRelative(item.date)}
            </div>
          )}
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {item.completed ? 'True' : 'False'}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <ConfirmModal onConfirm={onConfirm} />
      </div>
    </div>
  )
}

export default ItemHeader

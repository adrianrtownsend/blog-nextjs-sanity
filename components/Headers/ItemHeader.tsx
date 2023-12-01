import { CalendarIcon, PlusIcon, UserIcon } from '@heroicons/react/20/solid'
import { formatDateRelative } from 'components/Cards/TodoCard'
import ConfirmModal from 'components/Modals/ConfirmModal'
import Link from 'next/link'

export interface IItemHeaderProps {
  item?: {
    _type: string
    title?: string
    user?: any
    date?: string
    completed?: boolean
  }
  onConfirm?: () => Promise<boolean | void>
}

const ItemHeader = ({ item, onConfirm }: IItemHeaderProps) => {
  return (
    <div className="flex flex-wrap  lg:items-center lg:justify-between m-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {item.title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <Link href={`/users/${item?.user?.slug}`}>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <UserIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {item?.user?.name || item?.user?.nickname}
            </div>
          </Link>
          {item.date && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {formatDateRelative(item.date)}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0 gap-2">
        <ConfirmModal onConfirm={onConfirm} />
        <Link href={`/${item._type}s/new`}>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemHeader

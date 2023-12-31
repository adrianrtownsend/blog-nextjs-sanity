import { ClockIcon } from '@heroicons/react/20/solid'
import BasicSwitch from 'components/Switches/Switch'
import { formatDistance } from 'date-fns'
import { editItem } from 'lib/sanity.mutations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const formatDateRelative = (date: string) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}

const TodoCard = (props) => {
  const {
    _id,
    date,
    title,
    user,
    slug,
    content,
    dueDate,
    completed,
    favorited,
  } = props

  const [toggleDisabled, setToggleDisabled] = useState(false)
  const router = useRouter()

  const handleTodoToggle = () =>
    editItem({ _id, completed: !completed })
      .then(() => {
        setToggleDisabled(true)
        router.reload()
      })
      .catch((err) => {
        console.error('Error creating todo:', err)
      })

  return (
    <Link
      href={`/todos/${slug}`}
      className="block rounded-lg p-4 shadow-sm shadow-emerald-100"
    >
      <img
        alt="Home"
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-2">
        <dl>
          <div className="flex justify-between">
            <dt className="sr-only">Title</dt>

            <dd className="font-medium">{title}</dd>
            <BasicSwitch
              isEnabled={completed}
              handleSwitch={handleTodoToggle}
              disabled={toggleDisabled}
            />
          </div>
          <div>
            <dt className="sr-only">User</dt>

            <dd className="text-sm text-gray-500">
              {user?.name || user?.nickname}
            </dd>
          </div>
          <div>
            <dd className="font-medium">{content}</dd>
          </div>
          <div>
            <dt className="sr-only">User</dt>

            <dd className="text-sm text-gray-500">{favorited}</dd>
          </div>
        </dl>

        <div className="mt-1 flex items-center gap-8 text-xs">
          {date && (
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <ClockIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-600"
                aria-hidden="true"
              />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Created</p>

                <p className="font-medium">{formatDateRelative(date)}</p>
              </div>
            </div>
          )}
          {dueDate && (
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <ClockIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-600"
                aria-hidden="true"
              />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Due Deadline</p>

                <p className="font-medium">{formatDateRelative(dueDate)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default TodoCard

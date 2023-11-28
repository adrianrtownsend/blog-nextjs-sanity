import { CalendarIcon } from '@heroicons/react/20/solid'
import { compareAsc, formatDistance } from 'date-fns'
import Link from 'next/link'

import { formatDateRelative } from './TodoCard'
interface EventCardProps {
  title?: string
  content?: string
  date?: string
  startDate?: string
  endDate?: string
  user: {
    name?: string
    nickname?: string
    slug?: string
  }
  slug?: string
}

export const eventDateStatusFormat = (startDate: string, endDate: string) => {
  /**
   * check if startDate less than now()
   *
   * check if endDate greater than now()
   *
   * > format distance from endDate
   */

  const today = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  if (compareAsc(today, start)) {
    return (
      'Starts ' +
      formatDistance(start, today, {
        addSuffix: true,
      })
    )
  } else if (compareAsc(end, today)) {
    return (
      'Ends ' +
      formatDistance(today, end, {
        addSuffix: true,
      })
    )
  } else {
    return (
      'Ended ' +
      formatDistance(end, today, {
        addSuffix: true,
      })
    )
  }
}

const EventCard = ({ item }) => {
  const { title, content, date, startDate, endDate, user, slug } = item
  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-start sm:gap-8">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <CalendarIcon
            className="mx-auto h-10 w-10 flex-shrink-0 text-indigo-500"
            aria-hidden="true"
          />
        </div>

        <div>
          <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
            {eventDateStatusFormat(startDate, endDate)}
          </strong>

          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <Link href={`/events/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>

          <p className="mt-1 text-sm text-gray-700">{content}</p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />

              {date && (
                <p className="text-xs font-medium">
                  Created {formatDateRelative(date)}
                </p>
              )}
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              by{' '}
              <Link
                href={user?.slug ? `/users/${user.slug}` : '#'}
                className="underline hover:text-gray-700"
              >
                {user?.name || user?.nickname}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCard

import EventCard from 'components/Cards/EventCard'
import TodoCard from 'components/Cards/TodoCard'
import UserCard from 'components/Cards/UserCard'
import React from 'react'

export interface ItemSectionProps {
  type?: string
  createLink?: string
  items?: any[]
  title?: string
  description?: string
  scrollId?: string
}

const getSectionItem = (type, props) => {
  const items = {
    _event: <EventCard {...props} />,
    _todo: <TodoCard {...props} />,
    _user: <UserCard {...props} />,
  }
  return items[type]
}

const ItemSection = ({
  type = '_user',
  createLink,
  items = [],
  title = 'Default Title',
  description = 'Default description',
  scrollId,
}: ItemSectionProps) => {
  const testItems = items.map((e, i) => (
    <div key={i} className="grid gap-1 py-3 sm:gap-4">
      {getSectionItem(type, e)}
    </div>
  ))

  return (
    <section
      id={scrollId}
      className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 max-h-fit items-center my-5"
    >
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">{description}</p>

          <div className="mt-4 md:mt-8">
            <a
              href={createLink}
              className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Create new
            </a>
          </div>
        </div>
      </div>

      <div className="flow-root overflow-auto max-h-96">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">{testItems}</dl>
      </div>
    </section>
  )
}

export default ItemSection

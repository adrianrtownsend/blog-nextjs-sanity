import type { Todo } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './TodoDate'

export default function TodoPreview({
  title,
  date,
  slug,
  _type,
}: Omit<Todo, '_id'>) {
  return (
    <div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/todos/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
    </div>
  )
}

import type { Todo } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './TodoDate'

export default function HeroTodo(
  props: Pick<Todo, 'title' | 'content' | 'date' | 'slug'>,
) {
  const { title, content, date, slug } = props
  return (
    <section>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/todos/${slug}`} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          {content && <p className="mb-4 text-lg leading-relaxed">{content}</p>}
        </div>
      </div>
    </section>
  )
}

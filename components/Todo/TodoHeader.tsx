import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { Todo } from 'lib/sanity.queries'

import Date from './TodoDate'
import TodoTitle from './TodoTitle'

export default function TodoHeader(props: Pick<Todo, 'title' | 'date'>) {
  const { title, date } = props
  return (
    <>
      <TodoTitle>{title}</TodoTitle>
      {/* <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div> */}
      {/* <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div> */}
      <div className="mx-auto max-w-2xl">
        {/* <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div> */}
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}

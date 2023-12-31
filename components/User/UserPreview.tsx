import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { User } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './UserDate'

export default function UserPreview({
  name,
  nickname,
  slug,
}: Omit<User, '_id'>) {
  return (
    <div>
      <div className="mb-5">
        {/* <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        /> */}
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/users/${slug}`} className="hover:underline">
          {name || nickname}
        </Link>
      </h3>
      {/* <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div> */}
      {/* {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>} */}
      {/* {author && <Avatar name={author.name} picture={author.picture} />} */}
    </div>
  )
}

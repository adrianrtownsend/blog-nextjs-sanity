import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { User } from 'lib/sanity.queries'
import Link from 'next/link'

import Date from './UserDate'

export default function HeroUser(
  props: Pick<User, 'name' | 'nickname' | 'email' | 'picture' | 'slug'>,
) {
  const { name, nickname, email, picture, slug } = props
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          slug={slug}
          title={name || nickname}
          image={picture}
          priority
        />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/users/${slug}`} className="hover:underline">
              {name || nickname || 'Untitled'}
            </Link>
          </h3>
          {/* <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div> */}
        </div>
        <div>
          <AuthorAvatar name={name || nickname} picture={picture} />
        </div>
      </div>
    </section>
  )
}

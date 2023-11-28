import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { User } from 'lib/sanity.queries'

import Date from './UserDate'
import UserTitle from './UserTitle'

export default function UserHeader(
  props: Pick<User, 'name' | 'nickname' | 'picture'>,
) {
  const { name, nickname, picture } = props
  return (
    <>
      <UserTitle>{name || nickname}</UserTitle>
      <div className="hidden md:mb-12 md:block">
        <Avatar name={name || nickname} picture={picture} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        {/* <CoverImage title={title} image={coverImage} priority slug={slug} /> */}
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {<Avatar name={name || nickname} picture={picture} />}
        </div>
        <div className="mb-6 text-lg">{/* <Date dateString={date} /> */}</div>
      </div>
    </>
  )
}

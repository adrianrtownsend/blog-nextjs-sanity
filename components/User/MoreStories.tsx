import type { User } from 'lib/sanity.queries'

import UserPreview from './UserPreview'

export default function MoreStories({ users }: { users: User[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {users.map((user) => (
          <UserPreview
            key={user._id}
            name={user.name}
            // coverImage={post.coverImage}
            // date={post.date}
            nickname={user.nickname}
            slug={user.slug}
          />
        ))}
      </div>
    </section>
  )
}

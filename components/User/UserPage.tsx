import UserCard from 'components/Cards/UserCard'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import type { Settings, User } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import MoreStories from './MoreStories'
import UserPageHead from './UserPageHead'
import UserTitle from './UserTitle'

export interface UserPageProps {
  preview?: boolean
  loading?: boolean
  user: User
  moreUsers: User[]
  settings: Settings
}

const NO_USERS: User[] = []

export default function UserPage(props: UserPageProps) {
  const { preview, loading, moreUsers = NO_USERS, user, settings } = props

  const slug = user?.slug

  if (!slug && !preview) {
    notFound()
  }

  console.log('user from page: ', user)

  return (
    <>
      <UserPageHead settings={settings} user={user} />

      <Layout preview={preview} loading={loading}>
        {preview && !user ? (
          <UserTitle>Loading…</UserTitle>
        ) : (
          <>
            <article>
              <UserCard {...user} />
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}

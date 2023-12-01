import { useUser } from '@auth0/nextjs-auth0/client'
import Loading from 'components/Animations/Loading'
import UserCard from 'components/Cards/UserCard'
import Layout from 'components/Layouts/Layout'
import SectionSeparator from 'components/SectionSeparator'
import type { Settings, User } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import UserPageHead from './UserPageHead'

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
  const { user: currentUser } = useUser()

  if (!slug && !preview) {
    notFound()
  }

  if (!currentUser) return <Loading />

  return (
    <>
      <UserPageHead settings={settings} user={user} />

      <Layout preview={preview} loading={loading}>
        {preview && !user ? (
          <Loading />
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

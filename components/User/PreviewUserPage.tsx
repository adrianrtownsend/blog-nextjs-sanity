import {
  Settings,
  settingsQuery,
  type User,
  userAndMoreStoriesQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import UserPage, { UserPageProps } from './UserPage'

export default function PreviewUserPage(props: UserPageProps) {
  const [{ user: userPreview, moreUsers }, loadingUser] = useLiveQuery<{
    user: User
    moreUsers: User[]
  }>(
    { user: props.user, moreUsers: props.moreUsers },
    userAndMoreStoriesQuery,
    {
      slug: props.user.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <UserPage
      preview
      loading={loadingUser || loadingSettings}
      user={userPreview}
      moreUsers={moreUsers}
      settings={settings}
    />
  )
}

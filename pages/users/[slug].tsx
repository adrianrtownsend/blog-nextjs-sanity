import PreviewUserPage from 'components/User/PreviewUserPage'
import UserPage from 'components/User/UserPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllUsersSlugs,
  getClient,
  getSettings,
  getUserAndMoreStories,
} from 'lib/sanity.client'
import { Settings, User } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  user: User
  moreUsers: User[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, user, moreUsers, draftMode } = props

  if (draftMode) {
    return (
      <PreviewUserPage user={user} moreUsers={moreUsers} settings={settings} />
    )
  }

  return <UserPage user={user} moreUsers={moreUsers} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { user, moreUsers }] = await Promise.all([
    getSettings(client),
    getUserAndMoreStories(client, params.slug),
  ])

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
      moreUsers,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllUsersSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/users/${slug}`) || [],
    fallback: 'blocking',
  }
}
/**
 * profile of user by id
 * view
 *  - list item
 *  - links
 *      - edit
 *      - delete
 *      - logout
 * edit
 *  - form
 *      - fields
 *      - buttons
 */

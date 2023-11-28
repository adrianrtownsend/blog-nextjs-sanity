import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllEvents,
  getAllPosts,
  getAllTodos,
  getAllUsers,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { Event, Post, Settings, Todo, User } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  events: Event[]
  posts: Post[]
  settings: Settings
  todos: Todo[]
  users: User[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { events, posts, settings, draftMode, todos, users } = props

  if (draftMode) {
    return (
      <PreviewIndexPage
        events={events}
        posts={posts}
        settings={settings}
        todos={todos}
        users={users}
      />
    )
  }

  return (
    <IndexPage
      events={events}
      posts={posts}
      settings={settings}
      todos={todos}
      users={users}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = [], todos = [], events = [], users = []] =
    await Promise.all([
      getSettings(client),
      getAllPosts(client),
      getAllTodos(client),
      getAllEvents(client),
      getAllUsers(client),
    ])

  return {
    props: {
      events,
      posts,
      todos,
      users,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
